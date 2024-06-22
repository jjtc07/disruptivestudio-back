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

const mockUserAdmin = userStub({})
const mockUserReader = userStub({})
const mockUserCreator = userStub({})

describe('ThemeController (E2E)', () => {
  let app: Express
  let adminRole: any
  let readerRole: any
  let creatorRole: any
  let userAdmin: any
  let userReader: any
  let userCreator: any

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
  })

  afterAll(async () => {
    await userRepository.deleteMany({})
    await roleRepository.deleteMany({})
    await themeRepository.deleteMany({})
  })

  describe('POST api/v1/themes', () => {
    it('should return error if the user role is reader', async () => {
      const body = {
        name: faker.commerce.department(),
        banner: faker.image.url(),
        content: faker.lorem.sentence(),
      }

      const token = getUserToken({
        ...mockUserReader,
        id: userReader.id,
        _id: userReader.id,
        role: readerRole,
      })

      const response = await request(app)
        .post('/api/v1/themes')
        .set('Authorization', `Bearer ${token}`)
        .send(body)

      expect(response.status).toBe(StatusCode.FORBIDDEN)
    })

    it('should return error if the user role is creator', async () => {
      const body = {
        name: faker.commerce.department(),
        banner: faker.image.url(),
        content: faker.lorem.sentence(),
      }

      const token = getUserToken({
        ...mockUserCreator,
        id: userCreator.id,
        _id: userCreator.id,
        role: creatorRole,
      })

      const response = await request(app)
        .post('/api/v1/themes')
        .set('Authorization', `Bearer ${token}`)
        .send(body)

      expect(response.status).toBe(StatusCode.FORBIDDEN)
    })

    it('should create a category', async () => {
      const user = {
        ...mockUserAdmin,
        id: userAdmin.id,
        _id: userAdmin.id,
        role: adminRole,
      }

      const token = getUserToken(user)

      const categoryData = {
        name: faker.commerce.department(),
        content: faker.lorem.sentence(),
        banner: 'ciencia.jpg',
      }

      const bannerFilePath = path.join(
        __dirname,
        'files',
        'banners',
        categoryData.banner
      )

      const bannerFile = fs.readFileSync(bannerFilePath)

      const response = await request(app)
        .post('/api/v1/themes')
        .set('Authorization', `Bearer ${token}`)
        .attach('banner', bannerFile, categoryData.banner)
        .field('name', categoryData.name)
        .field('content', categoryData.content)

      expect(response.status).toBe(StatusCode.CREATED)
      expect(response.body).toHaveProperty('name', categoryData.name)
      expect(response.body).toHaveProperty('content', categoryData.content)
      expect(response.body).toHaveProperty('banner')
      expect(response.body).toHaveProperty('bannerUrl')
    })
  })
})
