import 'dotenv/config'

import { faker } from '@faker-js/faker'

import { roleRepository } from '../src/modules/role/domain'
import { generateUniqueCategoryNames } from '../src/modules/category/utils'
import { categoryRepository } from '../src/modules/category/domain'
import { RolesEnum } from '../src/modules/role/enums'
import { userRepository } from '../src/modules/user/domain'
import { themeRepository } from '../src/modules/theme/domain'
import { getRandomElement, getRandomIndex } from './utils'

export const themesSeeds = async () => {
  const numberOfThemes = 20
  const numberOfCategories = 3

  let resultThemes = []
  let resultCategories = []

  const creatorRole = await roleRepository.findOne({
    key: RolesEnum.CREATOR,
  })

  const adminRole = await roleRepository.findOne({
    key: RolesEnum.CREATOR,
  })

  const userAdmin = await userRepository.findOne({ role: adminRole?._id })
  const creators = await userRepository.find({ role: creatorRole?._id })

  const categoryNames = generateUniqueCategoryNames(numberOfCategories)

  for (const categoryName of categoryNames) {
    try {
      const category = await categoryRepository.create({
        name: categoryName,
        banner: faker.image.url(),
        content: faker.lorem.sentence(),
        createdBy: String(userAdmin?._id),
      })

      resultCategories.push(category)
    } catch (err) {
      continue
    }
  }

  const themeNames = generateUniqueCategoryNames(numberOfThemes)

  for (let index = 0; index < numberOfThemes; index++) {
    try {
      const themeData: any = {
        name: themeNames[index],
        cover: faker.image.url(),
        // cover: 'ciencia.jpg',
        description: faker.lorem.sentence(),
        createdBy: String(getRandomElement(creators)._id),
        categories: [],
      }

      const countCategories = getRandomIndex(resultCategories)

      for (let index = 0; index < countCategories; index++) {
        const idNewElement = String(getRandomElement(resultCategories)?._id)

        const isDuplicate = themeData.categories.some(
          (item: string) => item === idNewElement
        )

        if (isDuplicate) {
          continue
        }

        themeData.categories.push(idNewElement)
      }

      const theme = await themeRepository.create(themeData)

      resultThemes.push(theme)
    } catch (err) {
      continue
    }
  }

  return resultThemes
}
