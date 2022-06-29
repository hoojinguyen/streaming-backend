import { Document, Schema, Model, Connection } from 'mongoose'
import * as uuid from 'uuid'
import generateWidgetToken from '../../core/utils/generateWidgetToken'

export interface ICustomerModel extends Document {
  email: string
  hashedPassword: string
  widgetKey: string
  firstName: string
  lastName: string
  zoneName?: string
  isOnline?: boolean
  lastOnlineAt?: Date
  isVerifiedEmail?: boolean
  createdAt?: Date
  updatedAt?: Date
  isSuperAdmin?: boolean
  webhook?: string
}

export const CustomerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },    
    hashedPassword: {
      type: String,
      required: true,
    },    
    widgetKey: {
      type: String,
      required: true,
      default: uuid()
    },        
    firstName: {
      type: String,
      required: false,
    },  
    lastName: {
      type: String,
      required: false,
    },    
    zoneName: {
      type: String,
      required: true,
      default: 'America/New_York',
    },
    isVerifiedEmail: {
      type: Boolean,
      default: false,
      required: false,
    },    
    isOnline: {
      type: Boolean,
      default: false,
      required: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
      required: false,
    },
    lastOnlineAt: {
      type: Date,
      required: false,
      default: Date.now,
    },
    webhook: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
)

export default (connection: Connection) =>
  connection.model<ICustomerModel>('Customer', CustomerSchema, 'Customer')
