import express from 'express'
import { roleController } from './controllers'

const roleRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Roles V1
 *   description: Operaciones de los roles de usuario
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all themes
 *     tags:
 *       - Roles V1
 *     parameters:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       '200':
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 */
roleRouter.get('/', roleController.getAll.bind(roleController))

export default roleRouter
