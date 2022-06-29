import { Application } from 'express';
import peerHandler from '../handlers/rest-api/peer.handler';
import debug = require('debug');
const log = debug('streaming:routes:peer');

export default function (app: Application) {
  log('init setting routes');

  app.route('/peer/generate_peer').post(peerHandler.generatePeerInfo);
}
