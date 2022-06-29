import debug from 'debug'
const log = debug('streaming:services:mailer')
import * as nodemailer from 'nodemailer'
import IMailerService from './mailer.service'

const path = require('path')
const Email = require('email-templates')
const sendgrid = require('sendgrid')(process.env.MAIL_AUTH_PASS)
const transportOptions = {
  host: process.env.MAIL_HOST || `127.0.0.1`,
  port: Number.parseInt(process.env.MAIL_PORT || `25`, 10) || 25,
  pool: true,
  auth: {
    user: process.env.MAIL_AUTH_USER || ``,
    pass: process.env.MAIL_AUTH_PASS || ``,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
}
log(transportOptions)

const sender = `noreply@kickoff.tech`
const admins = process.env.MAIL_ADMINS ? process.env.MAIL_ADMINS.split(` `) : [`kickoff.tech@gmail.com`]
const isUsingSendGrid = process.env.MAIL_HOST && process.env.MAIL_HOST.indexOf('sendgrid') > 0

/**
 * getRestartingToAdminText
 */
const getRestartingToAdminText = (): string => `content`

/**
 * getRegistrationToAdminText
 */
const getRegistrationToAdminText = (username: string, email: string): string => `content`

/**
 * getVerificationEmailToUserText
 */
const getVerificationEmailToUserText = (
  username: string,
  email: string,
  token: string,
): string => `content`

/**
 * getConfirmationAfterUserVerifyAccountEmailToUserText
 */
const getConfirmationAfterUserVerifyAccountEmailToUserText = (
  username: string,
): string => `content`

/**
 * getResettingPasswordEmailToUserText
 */
const getResettingPasswordEmailToUserText = (
  username: string,
  email: string,
  token: string,
): string => `content`

/**
 * Mailer
 */
export default class MailService implements IMailerService {
  worker: any
  constructor() {
    this.worker = new Email({
      message: {
        from: process.env.MAIL_SENDER || sender,
      },
      transport: nodemailer.createTransport(transportOptions),
    })
  }

  noticeRegistrationToAdmin(username: string, email: string): void {
    log(`###### noticeRegistrationToAdmin`)    
  }

  generateSendGridBody(email: string, subject: string): any { 
    //    
  }

  // TODO: format email using template
  sendVerificationEmailToUser(email: string, token: string): void {
    log(`###### sendVerificationEmailToUser`)    
  }

  sendConfirmationAfterUserVerifyAccountEmailToUser(username: string, email: string): void {
    log(`###### sendConfirmationAfterUserVerifyAccountEmailToUser`)    
  }

  // TODO: format email using template
  sendResettingPasswordEmailToUser(username: string, email: string, token: string): void {
    log(`###### sendResettingPasswordEmailToUser`)    
}
