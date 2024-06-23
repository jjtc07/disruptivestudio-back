import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from '../../user/domain/user'
import { User } from '../../user/domain'
import { TypeContentEnum } from '../enums'

export interface ICategory {
  name: string
  key: string
  banner: string
  content: string
  typeContent: TypeContentEnum
  createdBy: IUser | Schema.Types.ObjectId | string
  createdAt?: Date
  updatedAt?: Date
}

export interface CategoryDocument extends ICategory, Document {}

export const CategorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    banner: {
      type: String,
    },
    content: {
      type: String,
    },
    typeContent: {
      type: String,
      enum: TypeContentEnum,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)

CategorySchema.virtual('bannerUrl').get(function () {
  return `${process.env.BASE_URL}/${this.banner}`
})

export const Category = mongoose.model<CategoryDocument>(
  'Category',
  CategorySchema
)
