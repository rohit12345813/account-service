import of from "await-of";
import config from "../../config";
import {IWithdrawAmountService} from "../../interfaces";
import Cache from "../../utils/cache";
import MethodHelper from "../../utils/helper";
import PublishAccountBalanceService from "../publishAccountBalance";

export default class WithdrawAmountService {

  public static async perform({amount, sourceAccountNumber, email}: IWithdrawAmountService) {
    console.log("WithdrawAmountService method called");

    // Validate input details
    const [data, error] = await WithdrawAmountService.validateAccount(
      sourceAccountNumber,
      amount,
      email,
    );

    if (error) {
      return [null, error];
    }

    const maximumWithdrawLimit = config.get("maximumWithdrawLimit");

    // check if amount exceed than maximum withdraw limit
    if (amount > maximumWithdrawLimit) {
      return [null, `You can't withdraw amount greater than ${maximumWithdrawLimit}`];
    }

    const newAmount = parseFloat(data.balance) - amount;

    const accountObj = {
      accountNumber: data.accountNumber,
      balance: MethodHelper.setDigit(newAmount),
      email: data.email,
    };

    const [, error2] = await of(Cache.setKey(data.accountNumber, accountObj));

    PublishAccountBalanceService.perform({
      accountNumber: data.accountNumber,
      balance:  accountObj.balance,
    });

    console.log("WithdrawAmountService method finished");
    return  [accountObj, error2];
  }

  public static async validateAccount(sourceAccountNumber: string, amount: number, email: string) {
    const [data, error] = await of(Cache.getKey(sourceAccountNumber));

    if (!data || error) {
      return [null, error || "Invalid Source Account Number"];
    }

    if (data.email !== email) {
      return [null, "Invalid Source Email Address"];
    }

    if (data.balance < amount) {
      return [null, "Insufficient balance"];
    }

    return [data];
  }
}
