import BaseRepo from './base-repo'
import * as mongoose from 'mongoose'
import * as uuid from 'uuid'
import { DateTime } from 'luxon'
import createModel, { ISupporterModel } from '../models/supporter'
import debug = require('debug')
const log = debug('kaira.data-services:repositories:customer')

export default class SupporterRepo extends BaseRepo<ISupporterModel> {
  constructor(connection: mongoose.Connection) {
    super(createModel(connection))
  }  

  async findAll(adminId?: string): Promise<ISupporterModel[]> {
    return this.model.find({
      adminId
    })
  }  
}
