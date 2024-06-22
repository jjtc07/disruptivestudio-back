import express from 'express'
import { postsController } from './controllers'
import {
  authMiddleware,
  validatePermission,
  validateSchema,
} from '../../../common/infrastructure/middlewares'
import { uploadMulter } from '../../../common/infrastructure/multer'
import { PermissionEnum } from '../../../common/enums'
import { PostsValidatorSchema } from './validators'

const postsRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Posts V1
 *   description: Operaciones de publicaciones
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all posts
 *     tags:
 *       - Posts V1
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
postsRouter.get(
  '/',
  authMiddleware,
  validatePermission({ requiredPermissions: [PermissionEnum.R] }),
  postsController.getAll.bind(postsController)
)

/**
 * @swagger
 * /posts/{postsId}:
 *   get:
 *     summary: Get posts by ID
 *     tags:
 *       - Posts V1
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postsId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the posts
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
postsRouter.get(
  '/:postsId',
  authMiddleware,
  validatePermission({ requiredPermissions: [PermissionEnum.R] }),
  postsController.getById.bind(postsController)
)

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new posts
 *     tags:
 *       - Posts V1
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Posts object
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: ['name', 'cover', 'description', 'permissions', 'typeContent']
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'New Posts'
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: Binary image file of the cover
 *               description:
 *                 type: string
 *                 example: 'Description of the new posts'
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
postsRouter.post(
  '/',
  authMiddleware,
  validatePermission({ requiredPermissions: [PermissionEnum.C] }),
  uploadMulter.single('cover'),
  validateSchema(PostsValidatorSchema),
  postsController.create.bind(postsController)
)

export default postsRouter
