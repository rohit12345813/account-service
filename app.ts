import bodyParser from "body-parser";
import express from "express";
import config from "./config";
import { account } from "./routes/account";
import Cache from "./services/cache";
import Socket from "./socket";

const app = express();
const port = config.get("port");

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// middleware for json body parsing
app.use(bodyParser.json({limit: "5mb"}));

app.use((req, res, next) => {
  const requestTime = new Date();
  console.log("requestTime ====>", requestTime);
  console.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/", account);

const listen = app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  Cache.setCache();
  console.log(`Started ${config.get("app.name")}`);
  console.log(`server is listening on ${port}, env ${config.get("env")}`);
});

Socket.setFayeSocket(listen);
