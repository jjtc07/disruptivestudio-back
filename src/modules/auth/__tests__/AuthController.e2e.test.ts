import request from 'supertest'

import { userRepository } from '../../user/domain'
import { createApp } from '../../../main'
import { Express } from 'express'
import { setupDatabase } from '../../common/__test__/setup'
import { roleSeeds } from '../../../../seeds/roles'
import { roleRepository } from '../../role/domain'
import { userStub } from '../../user/stubs/userStub'
import { StatusCode } from '../../common/enums'

const mockUser = userStub({})

describe('AuthController (E2E)', () => {
  let app: Express
  let adminRole: any
  let readerRole: any
  let creatorRole: any

  beforeAll(async () => {
    await setupDatabase()

    app = createApp()
    const roles = await roleSeeds()

    adminRole = roles[0]
    readerRole = roles[1]
    creatorRole = roles[2]

    await userRepository.create({
      ...mockUser,
      role: String(adminRole?._id),
    })
  })

  afterAll(async () => {
    await userRepository.deleteMany({})
    await roleRepository.deleteMany({})
  })

  describe('POST /api/v1/auth/login', () => {
    it('should login a user with valid credentials', async () => {
      const body = { email: mockUser.email, password: mockUser.password }

      const response = await request(app)
        .post('/api/v1/auth/sign-in')
        .send(body)

      expect(response.status).toBe(StatusCode.OK)
      expect(response.body).toHaveProperty('token')
      expect(response.body).toHaveProperty('email', mockUser.email)
      expect(response.body).toHaveProperty('username', mockUser.username)
      expect(response.body).toHaveProperty('role')
      expect(response.body.role).toHaveProperty('key', mockUser.role.key)
    })

    it('should return an error for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/sign-in')
        .send({ email: 'test@example.com', password: 'wrongpassword' })

      expect(response.status).toBe(StatusCode.UNAUTHORIZED)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toHaveProperty(
        'message',
        'Invalid credentials'
      )
    })
  })

  describe('POST /api/v1/auth/register', () => {
    it('should return an error if the email is empty', async () => {
      const newUser = {
        username: 'newuser',
        email: '',
        password: '123456',
        role: creatorRole._id,
      }

      const response = await request(app)
        .post('/api/v1/auth/sign-up')
        .send(newUser)

      expect(response.status).toBe(StatusCode.BAD_REQUEST)
      expect(response.body).toHaveProperty('error')
    })

    it('should register a new user', async () => {
      const newUser = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword',
        role: readerRole._id,
      }

      const response = await request(app)
        .post('/api/v1/auth/sign-up')
        .send(newUser)

      expect(response.status).toBe(StatusCode.CREATED)
      expect(response.body).toHaveProperty('email', newUser.email)
      expect(response.body).toHaveProperty('username', newUser.username)
      expect(response.body).toHaveProperty('role')
    })

    it('should return an error if user exist', async () => {
      const newUser = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword',
        role: readerRole._id,
      }

      const response = await request(app)
        .post('/api/v1/auth/sign-up')
        .send(newUser)

      expect(response.status).toBe(StatusCode.FORBIDDEN)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toHaveProperty(
        'message',
        'Email or username already in use'
      )
    })
  })
})
