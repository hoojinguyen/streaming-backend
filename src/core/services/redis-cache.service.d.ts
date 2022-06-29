export default interface IRedisCache {
  createUserSession(userId: string, options: any): Promise<boolean>
  getUserSession(userId: string): Promise<any>
  refreshUserSession(userId: string): Promise<any>
  removeUserSession(userId: string): Promise<any>
    
  createUserVerificationToken(userId: string, type: string, options: any): Promise<boolean>
  getUserVerificationToken(userId: string, type: string): Promise<any>
  removeUserVerificationToken(userId: string, type: string): Promise<any>

  createJob(jobName: string, data?: any, delayedTime?: number): Promise<void>
}