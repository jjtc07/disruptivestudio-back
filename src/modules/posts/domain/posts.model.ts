import mongoose, { Schema, Document } from 'mongoose'

import { IUser } from '../../user/domain/user'
import { User } from '../../user/domain'
import { ITheme, Theme } from '../../theme/domain'

export interface IPosts {
  title: string
  cover: string
  description: string
  themes: ITheme[] | Schema.Types.ObjectId[] | string[]
  createdBy: IUser | Schema.Types.ObjectId | string
  createdAt: Date
  updatedAt: Date
}

export interface PostsDocument extends IPosts, Document {}

export const PostsSchema = new Schema<PostsDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    themes: {
      type: [Schema.Types.ObjectId],
      ref: Theme,
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

PostsSchema.virtual('coverUrl').get(function () {
  // return `${process.env.BASE_URL}/${this.cover}`
  return this.cover
})

export const Posts = mongoose.model<PostsDocument>('Posts', PostsSchema)
