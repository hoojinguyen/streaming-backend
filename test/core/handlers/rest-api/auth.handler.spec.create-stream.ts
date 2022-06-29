import test from 'ava'
import { Server } from '../../../../src/core/server'
import * as uuid from 'uuid'
import { hashPassword } from '../../../../src/core/utils/encrypter'
import * as md5 from 'md5'
import * as _ from 'lodash'
import { customerRepo } from '../../../../src/core/repositories/index'
import clearData from '../../commons/clear-data'
import createUser from '../../commons/create-user'
import debug = require('debug')
import { createSecureServer } from 'http2'
const log = debug('streaming:backend:test:handlers:rest-api:auth')
const request = require('supertest')
const server = new Server()
const hashedPassword = md5('12345678')
const random = uuid()
const email = `${random}@gmail.com`
test.before('clear data', async t => {
  await clearData()
})
