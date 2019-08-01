import of from "await-of";
import config from "../../config";
import {IDepositAmountService} from "../../interfaces";
import Cache from "../../utils/cache";
import MethodHelper from "../../utils/helper";
import PublishAccountBalanceService from "../publishAccountBalance";

export default class DepositAmountService {

  public static async perform({amount, destinationAccountNumber}: IDepositAmountService) {
    console.log("DepositAmountService method called");
    // Fetch account detail
    const [data, error] = await of(Cache.getKey(destinationAccountNumber));

    if (!data || error ) {
      return [null, error || "Invalid destination Account Number"];
    }

    const maximumDepositLimit = config.get("maximumDepositLimit");

    // Check if deposit limit exceed or not
    if (amount > maximumDepositLimit) {
      return [null, `You can't send deposit amount greater than ${maximumDepositLimit}`];
    }

    const updatedBalance = parseFloat(data.balance) + amount;

    const accountObj = {
      accountNumber: data.accountNumber,
      balance: MethodHelper.setDigit(updatedBalance),
      email: data.email,
    };

    // Check if total balance reached to the maximum account balance
    if (config.get("maximumAmountInAccount") < updatedBalance) {
      return  [null, {depositLimit: "Deposit at destination failed"}];
    }

    const [, error2] = await of(Cache.setKey(data.accountNumber, accountObj));

    PublishAccountBalanceService.perform({
      accountNumber: data.accountNumber,
      balance:  accountObj.balance,
    });

    console.log("DepositAmountService method finished");
    return  [accountObj, error2];
  }

}
