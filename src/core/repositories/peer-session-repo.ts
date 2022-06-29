import BaseRepo from './base-repo'
import createModel, { IPeerSessionModel } from '@models/peer-session'
import * as mongoose from 'mongoose'
import debug = require('debug')
const log = debug('kaira.data-services:repositories:peer-session')

export default class PeerSessionRepo extends BaseRepo<IPeerSessionModel> {
  constructor(connection: mongoose.Connection) {
    super(createModel(connection))
  }  
    
}
