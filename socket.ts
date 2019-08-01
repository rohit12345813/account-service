import of from "await-of";
import Faye from "faye";
import config from "./config";
import Cache from "./services/cache";

interface ISocket {
  fayeConfigInstance: object;
  setFayeSocket(input: object): void;
  // any because faye not provide any ts library
  getFayeSocketInstance(): any;
}

const socket: ISocket = {
  fayeConfigInstance: null,

  setFayeSocket(listen) {
    const fayeConfig = new Faye.NodeAdapter({
      mount: config.get("socket.path"),
      timeout: config.get("socket.timeout"),
    });

    fayeConfig.on("handshake", (clientId: string) => {
      console.info(`client ${clientId} connected!!`);
    });

    fayeConfig.on("subscribe", async (clientId: string, data) => {
      console.info(`client ${clientId} subscribed!!`, data);
      const accountNumber = data.replace("/", "");
      const [accountDetails, error] = await of(Cache.getKey(accountNumber));
      let response;
      if (accountDetails && accountDetails.hasOwnProperty("balance")) {
        response = {balance: accountDetails.balance};
      } else  {
        response = {
          error: error
                  ? "Error while fetching the account details"
                  : "Invalid account number",
        };
      }

      fayeConfig.getClient().publish(`/${accountNumber}`, response);
    });

    // sending balance to user after the subcription
    fayeConfig.on("disconnect", async (clientId: string) => {
      console.info(`client ${clientId} disconnected!!`);
    });

    fayeConfig.attach(listen);
    this.fayeConfigInstance = fayeConfig;
  },

  getFayeSocketInstance() {
    return this.fayeConfigInstance;
  },
};

export default socket;
