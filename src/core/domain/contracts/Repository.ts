import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  PopulateOptions,
  PipelineStage,
  ProjectionType,
} from 'mongoose'
import { IRepository } from '../interfaces'

export class Repository<T extends Document> implements IRepository<T> {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  async findById(
    id: string,
    populate?: PopulateOptions | (string | PopulateOptions)[]
  ): Promise<T | null> {
    const response = this.model.findById(id)

    if (populate) {
      response.populate(populate)
    }

    return response
  }

  async findOne(
    filter: FilterQuery<T>,
    populate?: PopulateOptions | (string | PopulateOptions)[]
  ): Promise<T | null> {
    const response = this.model.findOne(filter)

    if (populate) {
      response.populate(populate)
    }

    return response
  }

  async find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    populate?: PopulateOptions | (string | PopulateOptions)[]
  ): Promise<T[]> {
    const response = this.model.find(filter, projection)

    if (populate) {
      response.populate(populate)
    }

    return response
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data)
  }

  async update(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true })
  }

  async delete(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(filter)
  }

  async deleteMany(filter: FilterQuery<T>): Promise<{ deletedCount: number }> {
    const result = await this.model.deleteMany(filter)

    return { deletedCount: result.deletedCount }
  }

  async insertMany(docs: T[]): Promise<T[] | null> {
    return this.model.insertMany(docs)
  }

  async aggregate(pipeline: PipelineStage[] | undefined): Promise<any[]> {
    return this.model.aggregate(pipeline)
  }
}
