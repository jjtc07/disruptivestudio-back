import { FilterQuery } from 'mongoose'
import bcrypt from 'bcryptjs'

import { UserDocument } from './user.model'
import { Repository } from '../../../core/domain/contracts/Repository'

export class UserRepository extends Repository<UserDocument> {
  async comparePassword(
    user: UserDocument,
    candidatePassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, user.password)
  }

  async findOneWithRoles(
    filter: FilterQuery<UserDocument>
  ): Promise<UserDocument | null> {
    return this.findOne(filter, ['role'])
  }
}
