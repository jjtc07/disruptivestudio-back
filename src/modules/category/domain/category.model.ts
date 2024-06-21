import mongoose, { Schema, Document } from 'mongoose'
import { User } from '../../user/domain/user'

export interface ICategory {
  name: string
  banner: string
  content: string
  permissions: Array<string>
  createdBy: User | Schema.Types.ObjectId
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
    permissions: {
      type: [String],
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export const Category = mongoose.model<CategoryDocument>(
  'Category',
  CategorySchema
)
