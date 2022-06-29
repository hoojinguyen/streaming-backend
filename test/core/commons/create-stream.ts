import { Server } from '../../../src/core/server'
import * as uuid from 'uuid'
import * as md5 from 'md5'
import * as _ from 'lodash'
import { StreamType } from '../../../src/constants/stream-type'
const request = require('supertest')
import debug = require('debug')
const log = debug('streaming:backend:test:common:create-stream')
const hashedPassword = md5('12345678')

export default async function createStream(server: Server, customerInfo: any, streamType: string, participants: any[]) {
  log('token: ', _.get(customerInfo, 'token'))
  const response = await request(server.getExpressApp())
    .post('/stream/create_stream')
    .set('Authorization', `JWT ${_.get(customerInfo, 'token')}`)
    .set('Content-Type', 'application/json')
    .send({ 
      streamType: StreamType.ONE_TO_ONE,      
      participants
    })
  return response.body  
}