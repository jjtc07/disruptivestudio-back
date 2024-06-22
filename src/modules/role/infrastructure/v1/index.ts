import express from 'express'
import { roleController } from './controllers'

const rolesRouter = express.Router()

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
 *     summary: Get all user roles
 *     tags:
 *       - Roles V1
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
rolesRouter.get('/', roleController.getAll.bind(roleController))

export default rolesRouter
