import * as crypto from 'crypto'

export function hashPassword(password: string, salt: string = process.env.SALT_PASSWORD || ''): string {
  return crypto
    .createHmac('md5', salt)
    .update(password)
    .digest('hex')
}
