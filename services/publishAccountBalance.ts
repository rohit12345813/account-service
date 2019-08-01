import {IPublishAccountBalanceService} from "../interfaces";
import SocketHelper from "../socket";

class PublishAccountBalanceService {
  public static async perform({accountNumber, balance}: IPublishAccountBalanceService) {
    const publish = SocketHelper.getFayeSocketInstance().getClient().publish(`/${accountNumber}`, {balance});

    publish.errback((publishError) => {
      console.info(`Publication failed for subject '/${accountNumber}'`, publishError);
    });
  }
}

export default PublishAccountBalanceService;
