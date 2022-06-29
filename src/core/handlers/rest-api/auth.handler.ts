import * as _ from 'lodash';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as initEmitter from 'socket.io-emitter';
import { ERROR } from '../../../constants/index';
import { customerService } from '../../services/index';
import { ICustomerModel } from '../../models/customer';
import { customerWithoutPassword } from '../response-builder';
import { hashPassword } from '../../utils/encrypter';
import { requireAuthenticated } from '../../decorators';
import { handleRestErrorMessage } from '../../utils/handleRestErrorMessage';
import debug = require('debug');
const log = debug('streaming:handlers:auth');
const opts = {
  host: process.env.REDIS_HOST || `redis`,
  port: Number.parseInt(process.env.REDIS_PORT || `6379`, 10) || 6379,
};
const emitter = initEmitter(null, opts);
const serverHashPassword = (pass: string): string => {
  return crypto
    .pbkdf2Sync(pass, `streaming@backend`, 10000, 256, 'sha256')
    .toString(`hex`);
};

function generateJWTToken(accountId: string, email: string): string {
  return jwt.sign(
    {
      accountId,
      email,
    },
    `${process.env.JSON_WEB_TOKEN_SECRET}`
  );
}

export class AuthHandler {
  async signUp(req: Request, res: Response, next: any): Promise<any> {
    log(`###### signUp`);
    try {
      const { email, hashedPassword, zoneName } = req.body;
      log('email: ', email);
      log('hashedPassword: ', hashedPassword);
      log('zoneName: ', zoneName);
      const createdAccount: ICustomerModel | null =
        await customerService.createNewAccount(
          email,
          hashPassword(hashedPassword),
          zoneName
        );

      createdAccount &&
        res.status(200).json({
          token: generateJWTToken(createdAccount.id, createdAccount.email),
          ...customerWithoutPassword(createdAccount),
        });

      // To Do:
      // redisCache.createUserSession)
      // mailService.sendVerificationEmailToUser
    } catch (ex) {
      const errorMessage = _.get(ex, 'message');
      handleRestErrorMessage(req, res, errorMessage);
    }
  }

  async signIn(req: Request, res: Response, next: any) {
    log(`###### signIn`);
    try {
      const { email, hashedPassword } = req.body;
      log('email: ', email);
      log('hashedPassword: ', hashedPassword);
      const createdAccount: ICustomerModel | null =
        await customerService.findExistingAccount(
          email,
          hashPassword(hashedPassword)
        );
      createdAccount &&
        res.status(200).json({
          token: generateJWTToken(createdAccount.id, createdAccount.email),
          ...customerWithoutPassword(createdAccount),
        });

      !createdAccount &&
        res.status(400).json({ error: ERROR.SERVICE.UNAUTHORIZED });
    } catch (ex) {
      const errorMessage = _.get(ex, 'message');
      handleRestErrorMessage(req, res, errorMessage);
    }
  }

  @requireAuthenticated()
  async signOut(req: any, res: Response, next: any) {
    log(`###### signOut`);
    res.status(200).send();
  }

  @requireAuthenticated()
  async resendVerificationEmail(req: any, res: Response, next: any) {
    log(`###### resendVerificationEmail`);
    throw new Error('Have not implement yet');
  }

  async verifyEmail(req: any, res: Response, next: any) {
    log(`###### verifyEmail`);
    throw new Error('Have not implement yet');
  }

  async forgotPassword(req: Request, res: Response, next: any) {
    log(`###### forgotPassword`);
    throw new Error('Have not implement yet');
  }

  async recoverPassword(req: any, res: Response, next: any) {
    log(`###### recoverPassword`);
    throw new Error('Have not implement yet');
  }

  async resetPassword(req: any, res: Response, next: any) {
    log(`###### resetPassword`);
    throw new Error('Have not implement yet');
  }

  async changePassword(req: Request, res: Response, next: any) {
    log(`###### changePassword`);
    throw new Error('Have not implement yet');
  }
}

export default new AuthHandler();
