import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from '../../user/domain/user'
import { User } from '../../user/domain'

export interface ICategory {
  name: string
  banner: string
  content: string
  createdBy: IUser | Schema.Types.ObjectId | string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryDocument extends ICategory, Document {}

export const CategorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    banner: {
      type: String,
    },
    content: {
      type: String,
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
