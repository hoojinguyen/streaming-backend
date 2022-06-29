import { Application } from 'express';
import authHandler from '../handlers/rest-api/auth.handler';
import debug = require('debug');
const log = debug('streaming:routes:auth');

export default function (app: Application) {
  log('init auth routes');

  app.route('/auth/sign_up').post(authHandler.signUp);

  app.route('/auth/sign_in').post(authHandler.signIn);

  app.route('/auth/sign_out').post(authHandler.signOut);

  app
    .route('/auth/resend_verification_email')
    .post(authHandler.resendVerificationEmail);

  app.route('/auth/verify_email').get(authHandler.verifyEmail);

  app.route('/auth/change_password').post(authHandler.changePassword);

  app.route('/auth/forgot_password').post(authHandler.forgotPassword);

  app.route('/auth/recover_password').get(authHandler.recoverPassword);

  app.route('/auth/reset_password').post(authHandler.resetPassword);
}
