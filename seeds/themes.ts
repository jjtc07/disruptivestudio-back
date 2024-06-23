import 'dotenv/config'

import { faker } from '@faker-js/faker'

import { roleRepository } from '../src/modules/role/domain'
import { generateUniqueCategoryNames } from '../src/modules/category/utils'
import { categoryRepository } from '../src/modules/category/domain'
import { RolesEnum } from '../src/modules/role/enums'
import { userRepository } from '../src/modules/user/domain'
import { themeRepository } from '../src/modules/theme/domain'
import { getRandomElement } from './utils'

export const themesSeeds = async () => {
  const numberOfThemes = 20

  let resultThemes = []

  const creatorRole = await roleRepository.findOne({
    key: RolesEnum.CREATOR,
  })

  const creators = await userRepository.find({ role: creatorRole?._id })

  const categories = await categoryRepository.find({})

  const themeNames = generateUniqueCategoryNames(numberOfThemes)

  for (let index = 0; index < numberOfThemes; index++) {
    try {
      const themeData: any = {
        name: themeNames[index],
        cover: faker.image.url(),
        description: faker.lorem.sentence(),
        createdBy: String(getRandomElement(creators)._id),
        category: String(getRandomElement(categories)._id),
      }

      const theme = await themeRepository.create(themeData)

      resultThemes.push(theme)
    } catch (err) {
      continue
    }
  }

  return resultThemes
}
