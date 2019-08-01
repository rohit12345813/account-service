import {NextFunction, Request, Response} from "express";
import config from "../config";
import Responder from "../utils/response";

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { headers } = req;
  const auth = headers.authorization;
  const basicToken = auth && auth.replace("Basic ", "");
  const credentials = Buffer.from(basicToken, "base64").toString("ascii");
  const [username, password] = credentials.split(":");
  const dbUserName = config.get("transferService.userName");
  const dbPassword = config.get("transferService.password");
  if ((dbUserName !== username) || (dbPassword !== password)) {
    return Responder.operationFailed(res, "Authentication Failed");
  } else {
    next();
  }
};

export default validateToken;
