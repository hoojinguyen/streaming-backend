import BaseRepo from './base-repo'
import createModel, { IPeerModel } from '@models/peer'
import * as mongoose from 'mongoose'
import * as _ from 'lodash'
import debug = require('debug')
const log = debug('kaira.data-services:repositories:peer')

export default class PeerRepo extends BaseRepo<IPeerModel> {
  constructor(connection: mongoose.Connection) {
    super(createModel(connection))
  }  

  async findByStreamId(streamId: string): Promise<IPeerModel[]> {
    return this.model.find({ streamId })
  }

  public toObjectWithoutCredentialData(data: IPeerModel): any {
    const clonedData = data.toJSON()
    _.set(clonedData, 'generatedKey', undefined)
    return data ? {
      ...clonedData
    } : {}
  }
  
}
