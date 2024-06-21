import mongoose, { Schema, Document } from 'mongoose'

import { TypeContentEnum } from '../enum'
import { User } from '../../user/domain/user'

export interface Theme {
  name: string
  cover: string
  description: string
  typeContent: Array<TypeContentEnum>
  permissions: Array<string>
  createdBy: User | Schema.Types.ObjectId | string
  createdAt: Date
  updatedAt: Date
}

export interface ThemeDocument extends Theme, Document {}

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
    typeContent: {
      type: [String],
      enum: TypeContentEnum,
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
