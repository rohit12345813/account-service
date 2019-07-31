import {Router} from "express";
import AccountController from "../controller/account";
import validateToken from "../middlewares/validateToken";

export const account = Router();

account.post("/api/account", AccountController.createAccount);
account.post("/api/account/withdraw", validateToken, AccountController.withdrawAmount);
account.post("/api/account/deposit", validateToken, AccountController.depositAmount);
