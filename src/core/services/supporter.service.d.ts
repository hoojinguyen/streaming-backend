import { ISupporterModel } from '../models/supporter'
export default interface ISupporterService {
  addSupporter(adminId: string, email: string): Promise<ISupporterModel|null>

  getSupporters(adminId: string): Promise<ISupporterModel[]|null>

  getOnlineSupporters(adminId: string): Promise<ISupporterModel[]|null>
  
  getOfflineSupporters(adminId: string): Promise<ISupporterModel[]|null>
  
  findAvailableSupporters(adminId: string): Promise<ISupporterModel[]>
}