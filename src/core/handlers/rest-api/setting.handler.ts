import * as _ from 'lodash';
import { Response, Request } from 'express';
import { handleRestErrorMessage } from '../../utils/handleRestErrorMessage';
import requireAuthenticated from '../../decorators/require-authenticated.decorator';
import { supporterService } from '../../services/index';
import debug = require('debug');
const log = debug('streaming:handlers:setting');
import { GROUPS, TYPES } from '../../../constants/index';

export class SettingHandler {
  @requireAuthenticated()
  async addSupporter(req: Request, res: Response, next: any): Promise<any> {
    log(`###### addSupporter`);
    try {
      const { email } = req.body;
      const accountId = _.get(req, 'user.accountId');
      log('email: ', email);
      log('adminId: ', accountId);
      const newSupporter = await supporterService.addSupporter(
        accountId,
        email
      );
      res.status(200).json(newSupporter);
    } catch (ex) {
      const errorMessage = _.get(ex, 'message');
      handleRestErrorMessage(req, res, errorMessage);
    }
  }

  @requireAuthenticated()
  async getSupporters(req: Request, res: Response, next: any): Promise<any> {
    log(`###### getSupporters`);
    try {
      throw new Error('Have not implement yet');
    } catch (ex) {
      const errorMessage = _.get(ex, 'message');
      handleRestErrorMessage(req, res, errorMessage);
    }
  }

  @requireAuthenticated()
  async removeSupporter(req: Request, res: Response, next: any): Promise<any> {
    log(`###### removeSupporter`);
    throw new Error('Have not implement yet');
  }
}

export default new SettingHandler();
