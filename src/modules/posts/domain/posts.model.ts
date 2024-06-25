import mongoose, { Schema, Document } from 'mongoose'

import { IUser } from '../../user/domain/user'
import { User } from '../../user/domain'
import { ITheme, Theme } from '../../theme/domain'
import { TypeContentEnum } from '../../category/enums'

export interface IPosts {
  title: string
  cover: string
  description: string
  content: IContent[]
  themes: ITheme[] | Schema.Types.ObjectId[] | string[]
  createdBy: IUser | Schema.Types.ObjectId | string
  createdAt: Date
  updatedAt: Date
}

export interface IContent {
  value: string
  typeContent: TypeContentEnum
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
    content: {
      type: [
        {
          value: {
            type: String,
            required: true,
          },
          typeContent: {
            type: String,
            enum: TypeContentEnum,
            required: true,
          },
        },
      ],
      required: true,
      minlength: 1,
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
  if (!this.cover.startsWith('http')) {
    return `${process.env.BASE_URL}/${this.cover}`
  }

  return this.cover
})

PostsSchema.virtual('contentUrl').get(function () {
  return this.content?.map((item) => {
    let value = item.value

    if (!value?.startsWith('http')) {
      value = `${process.env.BASE_URL}/uploads/${value}`
    }

    return {
      value,
      typeContent: item.typeContent,
    }
  })
})

export const Posts = mongoose.model<PostsDocument>('Posts', PostsSchema)
