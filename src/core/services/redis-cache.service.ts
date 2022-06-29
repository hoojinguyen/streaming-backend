import debug = require('debug')
import * as redis from 'redis'
import * as bluebird from 'bluebird'
import IRedisCache from './redis-cache.service.d'
const log = debug('streaming:services:redisCache')
const REDIS_KEYS = {
  USER_SESSION: 'UserSession',
  USER_VERIFICATION_TOKEN: `UserVerificationToken`,
}
const DEFAULT_USER_SESSION_TTL = 3600

const opts = {
  host: process.env.REDIS_HOST || `redis`,
  port: Number.parseInt(process.env.REDIS_PORT || `6379`, 10) || 6379,
}
export default class RedisCache implements IRedisCache {
  client: redis.RedisClient
  constructor() {
    this.client = redis.createClient(opts)
    this.client.on('error', error => {
      log(error)
    })
  }
  createJob(jobName: string, data?: any, delayedTime?: number | undefined): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async setValueToKey(key: string, value: any): Promise<any> {
    return bluebird.promisify(this.client.set, { context: this.client })(key, value)
  }

  async getValueFromKey(key: string): Promise<any> {
    return bluebird.promisify(this.client.get, { context: this.client })(key)
  }

  async setExpiration(key: string, durationInSeconds: number): Promise<any> {
    return bluebird.promisify(this.client.expire, { context: this.client })(key, durationInSeconds)
  }

  async createUserSession(userId: string, options: any): Promise<boolean> {
    try {
      const key = `${REDIS_KEYS.USER_SESSION}:${userId}`
      await this.setValueToKey(key, JSON.stringify(options))
      await this.setExpiration(key, DEFAULT_USER_SESSION_TTL * 12)
      return true
    } catch (ex) {
      log(ex.stack)
      return false
    }
  }

  async getUserSession(userId: string): Promise<any> {
    log(`getUserSession`)
    return JSON.parse(await this.getValueFromKey(`${REDIS_KEYS.USER_SESSION}:${userId}`))
  }

  async refreshUserSession(userId: string) {
    log('refreshUserSession')
    this.setExpiration(`${REDIS_KEYS.USER_SESSION}:${userId}`, DEFAULT_USER_SESSION_TTL)
    log(`Refreshed user session for user has id *${userId}*`)
  }

  async removeUserSession(userId: string): Promise<any> {
    log('removeUserSession')
    return bluebird.promisify<any, string>(this.client.del, { context: this.client })(
      `${REDIS_KEYS.USER_SESSION}:${userId}`,
    )
  }

  async createUserVerificationToken(userId: string, type: string, options: any): Promise<boolean> {
    try {
      const key = `${REDIS_KEYS.USER_VERIFICATION_TOKEN}:${userId}:${type}`
      await this.setValueToKey(key, JSON.stringify(options))
      await this.setExpiration(
        key,
        type === `Email`
          ? DEFAULT_USER_SESSION_TTL * 24 * 7
          : type === `RecoverPassword`
            ? DEFAULT_USER_SESSION_TTL
            : DEFAULT_USER_SESSION_TTL / 12,
      )
      return true
    } catch (ex) {
      log(ex.stack)
      return false
    }
  }

  async getUserVerificationToken(userId: string, type: string): Promise<any> {
    log(`getUserVerificationToken`)
    log(`key: *${`${REDIS_KEYS.USER_VERIFICATION_TOKEN}:${userId}:${type}`}*`)
    return JSON.parse(
      await this.getValueFromKey(`${REDIS_KEYS.USER_VERIFICATION_TOKEN}:${userId}:${type}`),
    )
  }

  async removeUserVerificationToken(userId: string, type: string): Promise<any> {
    log('removeUserVerificationToken')
    return bluebird.promisify<any, string>(this.client.del, { context: this.client })(
      `${REDIS_KEYS.USER_VERIFICATION_TOKEN}:${userId}:${type}`,
    )
  }
}
