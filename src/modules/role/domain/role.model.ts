import mongoose, { Schema, Document } from 'mongoose'
import { PermissionEnum } from '../../common/enums'

export interface Role {
  name: string
  key: string
  permissions: PermissionEnum[]
  createdAt: Date
  updatedAt: Date
}

export interface RoleDocument extends Role, Document {}

export const RoleSchema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: PermissionEnum,
    },
  },
  {
    timestamps: true,
  }
)

export const Role = mongoose.model<RoleDocument>('Role', RoleSchema)
