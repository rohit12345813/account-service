import of from "await-of";
import SocketHelper from "../socket";
import Cache from "./cache";

interface IPublishAccountBalanceService  {
  accountNumber: string;
  balance: string;
}

class PublishAccountBalanceService {
  public static async perform({accountNumber, balance}: IPublishAccountBalanceService) {
    const publish = SocketHelper.getFayeSocketInstance().getClient().publish(`/${accountNumber}`, {balance});

    publish.errback((publishError) => {
      console.info(`Publication failed for subject '/${accountNumber}'`, publishError);
    });
  }
}

export default PublishAccountBalanceService;
