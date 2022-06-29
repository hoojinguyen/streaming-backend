import { Server } from '../../../src/core/server'
import * as uuid from 'uuid'
import * as md5 from 'md5'
import * as _ from 'lodash'
const request = require('supertest')
import debug = require('debug')
const log = debug('streaming:backend:test:common:assign-supporter')
const hashedPassword = md5('12345678')

export default async function generatePeer(server: Server, customerInfo: any) {  
  const response = await request(server.getExpressApp())
    .post('/peer/generate_peer')  
    .send({
      customerId: _.get(customerInfo, '_id')
    })
  
  return response.body
}