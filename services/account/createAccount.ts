import of from "await-of";
import config from "../../config";
import MethodHelper from "../../helper";
import SocketHelper from "../../socket";
import Cache from "../cache";

interface ICreateAccountService {
  email: string;
}

export default class CreateAccountService {

  public static async perform({email}: ICreateAccountService) {
    console.log("CreateAccountService method called");

    // validate param
    const inValidEmail = CreateAccountService.checkParam(email);

    if (inValidEmail) {
      return [null, "Invalid Email!!"];
    }

    // check if email already exists
    const [res, error] = await of(Cache.isKeyValuePresent("email", email));

    if (res || error) {
      return [null, error || "User Already Found"];
    }

    const accountNumber = MethodHelper.getUniqId();
    // create account
    const [, error2] = await of(Cache.setKey(accountNumber, {
      accountNumber,
      balance: MethodHelper.setDigit(config.get("defaultAccountBalance")),
      createdAt: new Date().getTime(),
      email,
    }));

    if (error2) {
      return ["Error occuring while creating the user account"];
    }

    console.log("CreateAccountService method finished");
    return  [{email, accountNumber}, error];
  }

  public static checkParam(email) {
    return !MethodHelper.isEmail(email);
  }
}
