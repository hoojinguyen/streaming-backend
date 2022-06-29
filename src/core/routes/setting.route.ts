import { Application } from 'express';
import settingHandler from '../handlers/rest-api/setting.handler';
import debug = require('debug');
const log = debug('streaming:routes:setting');

export default function (app: Application) {
  log('init setting routes');

  app.route('/setting/add_supporter').post(settingHandler.addSupporter);

  app.route('/setting/remove_supporter').post(settingHandler.removeSupporter);

  app.route('/setting/get_supporters').get(settingHandler.getSupporters);
}
