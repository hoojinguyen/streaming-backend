import { Document, Schema, Model, Connection, Types } from 'mongoose'
import * as uuid from 'uuid'

export interface ICustomerReportModel extends Document {

  customerId: string
  supporterId?: string
  type: string
  date: string
  week: number
  month: number
  year: number
  zoneName: string
  value: number
  createdDate?: Date
  updatedDate?: Date    
}

export const CustomerReportSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    supporterId: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },    
    date: {
      type: String,
      required: true,
    },    
    week: {
      type: Number,
      required: true,
    },    
    month: {
      type: Number,
      required: true,
    },    
    year: {
      type: Number,
      required: true,
    },    
    zoneName: {
      type: String,
      required: true,
    },    
    value: {
      type: Number,
      required: true,
    },    
    createdDate: {
      type: Date,
      required: false,
      default: Date.now,
    },
    updatedDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
)

export default (connection: Connection) =>
  connection.model<ICustomerReportModel>('CustomerReport', CustomerReportSchema, 'CustomerReport')
