import { Express } from 'express'
import request from 'supertest'
import fs from 'fs'
import path from 'path'
import { faker } from '@faker-js/faker'

import { userRepository } from '../../user/domain'
import { createApp } from '../../../main'
import { setupDatabase } from '../../common/__test__/setup'
import { roleSeeds } from '../../../../seeds/roles'
import { roleRepository } from '../../role/domain'
import { userStub } from '../../user/stubs/userStub'
import { StatusCode } from '../../common/enums'
import { getUserToken } from '../../auth/utils'
import { themeRepository } from '../domain'
import { categoryRepository } from '../../category/domain'
import { generateUniqueCategoryNames } from '../../category/utils'

const mockUserAdmin = userStub({})
const mockUserReader = userStub({})
const mockUserCreator = userStub({})

const categoryNames = generateUniqueCategoryNames(3)

describe('ThemeController (E2E)', () => {
  let app: Express
  let adminRole: any
  let readerRole: any
  let creatorRole: any
  let userAdmin: any
  let userReader: any
  let userCreator: any
  let resultCategories: any[]

  beforeAll(async () => {
    await setupDatabase()

    app = createApp()
    const roles = await roleSeeds()

    adminRole = roles[0]
    readerRole = roles[1]
    creatorRole = roles[2]

    const userResponse = await Promise.all([
      userRepository.create({
        ...mockUserAdmin,
        role: String(adminRole?._id),
      }),
      userRepository.create({
        ...mockUserReader,
        role: String(readerRole?._id),
      }),
      userRepository.create({
        ...mockUserCreator,
        role: String(creatorRole?._id),
      }),
    ])

    userAdmin = userResponse[0]
    userReader = userResponse[1]
    userCreator = userResponse[2]

    const categoryData1 = {
      name: categoryNames[0],
      banner: faker.image.url(),
      content: faker.lorem.sentence(),
      createdBy: userAdmin.id,
    }

    const categoryData2 = {
      name: categoryNames[1],
      banner: faker.image.url(),
      content: faker.lorem.sentence(),
      createdBy: userAdmin.id,
    }

    const categoryData3 = {
      name: categoryNames[2],
      banner: faker.image.url(),
      content: faker.lorem.sentence(),
      createdBy: userAdmin.id,
    }

    resultCategories = await Promise.all([
      categoryRepository.create(categoryData1),
      categoryRepository.create(categoryData2),
      categoryRepository.create(categoryData3),
    ])
  })

  afterAll(async () => {
    await userRepository.deleteMany({})
    await roleRepository.deleteMany({})
    await categoryRepository.deleteMany({})
    await themeRepository.deleteMany({})
  })

  describe('POST api/v1/themes', () => {
    it('should return error if the user role is reader', async () => {
      const themeData = {
        name: faker.commerce.department(),
        cover: 'ciencia.jpg',
        description: faker.lorem.sentence(),
        categories: [],
      }

      const coverFilePath = path.join(
        __dirname,
        'files',
        'covers',
        themeData.cover
      )

      const coverFile = fs.readFileSync(coverFilePath)

      const response = await request(app)
        .post('/api/v1/themes')
        .attach('cover', coverFile, themeData.cover)
        .field('name', themeData.name)
        .field('description', themeData.description)
        .field('categories', themeData.categories)

      expect(response.status).toBe(StatusCode.UNAUTHORIZED)
    })

    it('should return error if the user role is reader', async () => {
      const themeData = {
        name: faker.commerce.department(),
        cover: 'ciencia.jpg',
        description: faker.lorem.sentence(),
        categories: [],
      }

      const token = getUserToken({
        ...mockUserReader,
        id: userReader.id,
        _id: userReader.id,
        role: readerRole,
      })

      const coverFilePath = path.join(
        __dirname,
        'files',
        'covers',
        themeData.cover
      )

      const coverFile = fs.readFileSync(coverFilePath)

      const response = await request(app)
        .post('/api/v1/themes')
        .set('Authorization', `Bearer ${token}`)
        .attach('cover', coverFile, themeData.cover)
        .field('name', themeData.name)
        .field('description', themeData.description)
        .field('categories', themeData.categories)

      expect(response.status).toBe(StatusCode.FORBIDDEN)
    })

    it('should create a theme if the user role is creator', async () => {
      const themeData = {
        name: faker.commerce.department(),
        cover: 'ciencia.jpg',
        description: faker.lorem.sentence(),
        categories: [
          String(resultCategories[0]?._id),
          String(resultCategories[1]?._id),
        ],
      }

      const token = getUserToken({
        ...mockUserCreator,
        id: userCreator.id,
        _id: userCreator.id,
        role: creatorRole,
      })

      const coverFilePath = path.join(
        __dirname,
        'files',
        'covers',
        themeData.cover
      )

      const coverFile = fs.readFileSync(coverFilePath)

      const response = await request(app)
        .post('/api/v1/themes')
        .set('Authorization', `Bearer ${token}`)
        .attach('cover', coverFile, themeData.cover)
        .field('name', themeData.name)
        .field('description', themeData.description)
        .field('categories', themeData.categories[0])
        .field('categories', themeData.categories[1])

      expect(response.status).toBe(StatusCode.CREATED)
      expect(response.body).toHaveProperty('name', themeData.name)
      expect(response.body).toHaveProperty('description', themeData.description)
      expect(response.body).toHaveProperty('cover')
      expect(response.body).toHaveProperty('coverUrl')
    })

    it('should create a category', async () => {
      const user = {
        ...mockUserAdmin,
        id: userAdmin.id,
        _id: userAdmin.id,
        role: adminRole,
      }

      const token = getUserToken(user)

      const themeData = {
        name: faker.commerce.department(),
        cover: 'ciencia.jpg',
        description: faker.lorem.sentence(),
        categories: [
          String(resultCategories[0]?._id),
          String(resultCategories[1]?._id),
          String(resultCategories[2]?._id),
        ],
      }

      const coverFilePath = path.join(
        __dirname,
        'files',
        'covers',
        themeData.cover
      )

      const coverFile = fs.readFileSync(coverFilePath)

      const response = await request(app)
        .post('/api/v1/themes')
        .set('Authorization', `Bearer ${token}`)
        .attach('cover', coverFile, themeData.cover)
        .field('name', themeData.name)
        .field('description', themeData.description)
        .field('categories', themeData.categories[1])
        .field('categories', themeData.categories[2])

      expect(response.status).toBe(StatusCode.CREATED)
      expect(response.body).toHaveProperty('name', themeData.name)
      expect(response.body).toHaveProperty('description', themeData.description)
      expect(response.body).toHaveProperty('cover')
      expect(response.body).toHaveProperty('coverUrl')
    })
  })
})
