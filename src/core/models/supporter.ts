import { Document, Schema, Model, Connection, Types } from 'mongoose'
import * as uuid from 'uuid'

export interface ISupporterModel extends Document {    
  adminId: string
  supporterId: string
  roles: string[]
  isAvailableForSupport: boolean
  isSupporting: boolean
}

export const SupporterSchema = new Schema(
  {
    adminId: {
      type: String,
      required: true,
    },        
    supporterId: {
      type: String,
      required: true,
    },    
    roles: {      
      type: [String],
      required: false,
    },
    isAvailableForSupport: {      
      type: Boolean,
      required: false,
      default: false
    },
    isSupporting: {      
      type: Boolean,
      required: false,
      default: false
    },
  }    
)

export default (connection: Connection) =>
  connection.model<ISupporterModel>('Supporter', SupporterSchema, 'Supporter')
