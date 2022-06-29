import {
  Connection,
  Document,
  model,
  Model,
  Query,
  Schema,  
  Types,
} from 'mongoose'
import * as _ from 'lodash'

export default class BaseRepo<T extends Document> {
  protected model: Model<T>

  constructor(schemaModel: Model<T>) {
    this.model = schemaModel
  }

  async findOne(query: object): Promise<T | null> {
    return this.model.findOne(query)
  }

  async findById(_id: string): Promise<T | null> {
    return this.model.findById(this.toObjectId(_id))
  }

  async findAll(customerId?: string): Promise<T[]> {
    return this.model.find({
      customerId
    })
  }  

  async create(item: T): Promise<T> {
    return this.model.create(item)
  }

  async removeAll(): Promise<any> {
    return this.model.deleteMany({})
  }

  async removeById(id: string): Promise<any> {
    return this.model.remove({ _id: this.toObjectId(id) })
  }

  async removeByObjectId(id: Types.ObjectId): Promise<any> {
    return  this.model.remove({ _id: id })
  }

  async updateFields(id: Types.ObjectId, updateFields: any): Promise<T> {
    return this.model.updateOne({ _id: id }, { $set: updateFields })
  }

  public toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id)
  }

  public toObject(data: T): any {
    return data ? data.toJSON() : {}
  }

  public toObjectWithoutCredentialData(data: T): any {
    return data ? data.toJSON() : {}    
  }
  
}
