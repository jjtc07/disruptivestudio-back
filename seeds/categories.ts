import 'dotenv/config'

import { faker } from '@faker-js/faker'

import { roleRepository } from '../src/modules/role/domain'
import { ICategory, categoryRepository } from '../src/modules/category/domain'
import { RolesEnum } from '../src/modules/role/enums'
import { userRepository } from '../src/modules/user/domain'
import { TypeContentEnum } from '../src/modules/category/enums'

export const categoriesSeeds = async () => {
  const resultCategories = []

  const adminRole = await roleRepository.findOne({
    key: RolesEnum.CREATOR,
  })

  const userAdmin = await userRepository.findOne({ role: adminRole?._id })

  const categoriesData = getCategoriesData(userAdmin)

  for (const categoryData of categoriesData) {
    try {
      const categoryExist = await roleRepository.findOne({
        key: { $regex: new RegExp(`^${categoryData.key}$`, 'i') },
      })

      if (categoryExist) {
        resultCategories.push(categoryExist)

        continue
      }

      const category = await categoryRepository.create(categoryData)

      resultCategories.push(category)
    } catch (err) {
      continue
    }
  }

  return resultCategories
}

export const getCategoriesData = (userAdmin: any): ICategory[] => {
  return [
    {
      name: TypeContentEnum.IMAGE,
      key: TypeContentEnum.IMAGE.toUpperCase(),
      typeContent: TypeContentEnum.IMAGE,
      banner: faker.image.url(),
      content: faker.lorem.paragraphs({ min: 5, max: 20 }),
      createdBy: String(userAdmin?._id),
    },
    {
      name: TypeContentEnum.VIDEO,
      key: TypeContentEnum.VIDEO.toUpperCase(),
      typeContent: TypeContentEnum.VIDEO,
      banner: faker.image.url(),
      content: faker.lorem.paragraphs({ min: 5, max: 20 }),
      createdBy: String(userAdmin?._id),
    },
    {
      name: TypeContentEnum.TEXT,
      key: TypeContentEnum.TEXT.toUpperCase(),
      typeContent: TypeContentEnum.TEXT,
      banner: faker.image.url(),
      content: faker.lorem.paragraphs({ min: 5, max: 20 }),
      createdBy: String(userAdmin?._id),
    },
  ]
}
