import mongoose, { Schema, Document } from 'mongoose'

import { IUser } from '../../user/domain/user'
import { User } from '../../user/domain'
import { Category, ICategory } from '../../category/domain'

export interface ITheme {
  name: string
  cover: string
  description: string
  category: Schema.Types.ObjectId | string | ICategory
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
    category: {
      type: Schema.Types.ObjectId,
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
