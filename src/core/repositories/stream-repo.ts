import BaseRepo from './base-repo'
import createModel, { IStreamModel } from '@models/stream'
import * as mongoose from 'mongoose'
import debug = require('debug')
const log = debug('kaira.data-services:repositories:stream')

export default class StreamRepo extends BaseRepo<IStreamModel> {
  constructor(connection: mongoose.Connection) {
    super(createModel(connection))
  }  
}
