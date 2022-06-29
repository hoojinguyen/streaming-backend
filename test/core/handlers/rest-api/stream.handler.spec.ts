import test from 'ava'
import { Server } from '../../../../src/core/server'
import * as uuid from 'uuid'
import { hashPassword } from '../../../../src/core/utils/encrypter'
import * as md5 from 'md5'
import * as _ from 'lodash'
import { customerRepo } from '../../../../src/core/repositories/index'
import clearData from '../../commons/clear-data'
import createUser from '../../commons/create-user'
import createStream from '../../commons/create-stream'
import debug = require('debug')
import { createSecureServer } from 'http2'
import { StreamType } from '../../../../src/constants/stream-type'
const log = debug('streaming:backend:test:handlers:rest-api:stream')
const request = require('supertest')
const server = new Server()
const hashedPassword = md5('12345678')
const random = uuid()
const email = `${random}@gmail.com`

test.before('clear data', async t => {
  await clearData()
})

test('create stream', async t => {
  const userInfo = await createUser(server)
  log('userInfo:', userInfo)
  const newStream = await createStream(server, userInfo, StreamType.ONE_TO_ONE, [
    {
      username: '001',
      payload: {
        username: '001',
        avatar: '001.png',
        gender: 'female',
      }
    },
    {
      username: '002',
      payload: {
        username: '002',
        avatar: '002.png',
        gender: 'male',
      }
    }
  ])
  log('newStream: ', JSON.stringify(newStream))  
  t.pass()  
})
