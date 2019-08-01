import CreateAccountService from "../services/account/createAccount";
import DepositAmountService from "../services/account/depositAmount";
import WithdrawAmountService from "../services/account/withdrawAmount";
import ResponseService from "../utils/response";

class AccountController {
  public static async createAccount(req, res) {
    const [response, error] = await CreateAccountService.perform({email: req.body.email});
    if (error) {
      ResponseService.operationFailed(res, error);
    } else {
      ResponseService.success(res, response);
    }
  }

  public static async withdrawAmount(req, res) {
    const [response, error] = await WithdrawAmountService.perform(req.body);
    if (error) {
      ResponseService.operationFailed(res, error);
    } else {
      ResponseService.success(res, response);
    }
  }

  public static async depositAmount(req, res) {
    const [response, error] = await DepositAmountService.perform(req.body);
    if (error) {
      ResponseService.operationFailed(res, error);
    } else {
      ResponseService.success(res, response);
    }
  }
}

export default AccountController;
