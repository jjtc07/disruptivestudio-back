import express from 'express'
import { authController } from './controllers'
import { authMiddleware } from './middlewares'

const authRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth V1
 *   description: Operaciones de autenticación de usuario
 */

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Sign in a user
 *     tags:
 *       - Auth V1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 */
authRouter.post('/sign-in', authController.login.bind(authController))

/**
 * @swagger
 *
 * /auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth V1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 */
authRouter.post('/sign-up', authController.register.bind(authController))

/**
 * @swagger
 *
 * /auth/me:
 *   post:
 *     summary: Validate user by token
 *     tags:
 *       - Auth V1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
authRouter.post('/me', authMiddleware, authController.me.bind(authController))

export default authRouter
