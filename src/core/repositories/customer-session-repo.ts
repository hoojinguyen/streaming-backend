import BaseRepo from './base-repo'
import createModel, { ICustomerSessionModel } from '@models/customer-session'
import * as mongoose from 'mongoose'
import * as uuid from 'uuid'
import { DateTime } from 'luxon'
import debug = require('debug')
const log = debug('kaira.data-services:repositories:customer')

export default class CustomerSessionRepo extends BaseRepo<ICustomerSessionModel> {
  constructor(connection: mongoose.Connection) {
    super(createModel(connection))
  }

}
