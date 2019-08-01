import {Router} from "express";
import AccountController from "../controller/account";
import validateToken from "../middlewares/validateToken";

export const account = Router();

const API_END_POINT = "/api/account";

account.post(API_END_POINT, AccountController.createAccount);
account.post(`${API_END_POINT}/withdraw`, validateToken, AccountController.withdrawAmount);
account.post(`${API_END_POINT}/deposit`, validateToken, AccountController.depositAmount);
