import * as _ from 'lodash';
import { Response, Request } from 'express';
import { customerService, peerService } from '../../services/index';
import { handleRestErrorMessage } from '../../utils/handleRestErrorMessage';
import debug = require('debug');
const log = debug('streaming:handlers:peer');

export class PeerHandler {
  async generatePeerInfo(req: Request, res: Response, next: any) {
    log(`###### generatePeerInfo`);
    try {
      const { key, customerId } = req.body;
      log('customerId: ', customerId);
      const newPeer = await peerService.createNewPeer(customerId, {});
      res.status(200).json(newPeer);
    } catch (ex) {
      const errorMessage = _.get(ex, 'message');
      handleRestErrorMessage(req, res, errorMessage);
    }
  }
}

export default new PeerHandler();
