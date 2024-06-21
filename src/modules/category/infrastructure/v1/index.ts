import express from 'express'
import { categoryController } from './controllers'
import { authMiddleware } from '../../../common/infrastructure/middlewares'

const categoryRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Categories V1
 *   description: Operaciones de categorías
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all themes
 *     tags:
 *       - Categories V1
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
categoryRouter.get(
  '/',
  authMiddleware,
  categoryController.getAll.bind(categoryController)
)

/**
 * /categories/{id}:
 *   get:
 *     summary: Get one theme by id
 *     tags:
 *       - Categories V1
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id
 *     schema:
 *       type: string
 *       minimum: 1
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
categoryRouter.get(
  '/:id',
  authMiddleware,
  categoryController.getOne.bind(categoryController)
)

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories V1
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Theme object
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: ['name', 'cover', 'description', 'permissions', 'typeContent']
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'New Theme'
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: Binary image file of the cover
 *               description:
 *                 type: string
 *                 example: 'Description of the new theme'
 *               typeContent:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - image
 *                     - video
 *                     - text
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - C
 *                     - R
 *                     - U
 *                     - D
 *                 description: Array of permissions (at least one is required)
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
categoryRouter.post(
  '/',
  authMiddleware,
  categoryController.create.bind(categoryController)
)

export default categoryRouter
