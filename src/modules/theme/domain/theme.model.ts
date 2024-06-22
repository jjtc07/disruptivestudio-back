import mongoose, { Schema, Document } from 'mongoose'

// import { TypeContentEnum } from '../enum'
import { IUser } from '../../user/domain/user'
import { User } from '../../user/domain'
import { Category, ICategory } from '../../category/domain'

export interface ITheme {
  name: string
  cover: string
  description: string
  categories: ICategory[] | Schema.Types.ObjectId[] | string[]
  // typeContent: Array<TypeContentEnum>
  createdBy: IUser | Schema.Types.ObjectId | string
  createdAt: Date
  updatedAt: Date
}

export interface ThemeDocument extends ITheme, Document {}

export const ThemeSchema = new Schema<ThemeDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    cover: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    // typeContent: {
    //   type: [String],
    //   enum: TypeContentEnum,
    // },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: Category,
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

ThemeSchema.virtual('coverUrl').get(function () {
  return `${process.env.BASE_URL}/${this.cover}`
})

export const Theme = mongoose.model<ThemeDocument>('Theme', ThemeSchema)
