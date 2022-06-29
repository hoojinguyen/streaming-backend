export default interface IMailerService {  
  noticeRegistrationToAdmin(username: string, email: string): void
  generateSendGridBody(email: string, subject: string): any
  sendVerificationEmailToUser(email: string, token: string): void
  sendConfirmationAfterUserVerifyAccountEmailToUser(username: string, email: string): void
  sendResettingPasswordEmailToUser(username: string, email: string, token: string): void

}