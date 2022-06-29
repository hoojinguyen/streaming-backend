import { Document, Schema, Model, Connection, Types } from 'mongoose'
import * as uuid from 'uuid'

export interface ICustomerSessionModel extends Document {
  customerId: string
  createdDate?: Date
  endDate?: Date
  fromDevice?: string
  deviceDetails: any
  socketId: string
  isActive: boolean
}

export const CustomerSessionSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
    },        
    socketId: {
      type: String,
      required: true,
    },        
    createdDate: {
      type: Date,
      required: false,
      default: Date.now,
    }, 
    endDate: {
      type: Date,
      required: false,
      default: Date.now,
    }, 
    fromDevice: {
      type: String,
      required: false,
    },     
    deviceDetails: {
      type: Schema.Types.Mixed,
      required: false,
    },     
    isActive: {
      type: Boolean,
      required: false,
      default: true
    },     
  },
  { timestamps: true },
)

export default (connection: Connection) =>
  connection.model<ICustomerSessionModel>('CustomerSession', CustomerSessionSchema, 'CustomerSession')
