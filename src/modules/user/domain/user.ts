import { Schema } from 'mongoose'
import { Role } from '../../role/domain'

export interface User {
  username: string
  email: string
  password: string
  role: Role | Schema.Types.ObjectId | string
  token?: string
  createdAt: Date
  updatedAt: Date
}
