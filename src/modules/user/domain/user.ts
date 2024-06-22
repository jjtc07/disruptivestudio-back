import { Schema } from 'mongoose'
import { IRole } from '../../role/domain'

export interface IUser {
  username: string
  email: string
  password: string
  role: IRole | Schema.Types.ObjectId | string
  token?: string
  createdAt?: Date
  updatedAt?: Date
}
