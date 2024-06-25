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
import { optionalAuthMiddleware } from '../../../common/infrastructure/middlewares/optionalAuthMiddleware'

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
 *     summary: Get all posts
 *     tags:
 *       - Posts V1
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request
 */
postsRouter.get(
  '/',
  optionalAuthMiddleware,
  postsController.getAll.bind(postsController)
)

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get posts by ID
 *     tags:
 *       - Posts V1
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
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
  '/:postId',
  optionalAuthMiddleware,
  postsController.getById.bind(postsController)
)

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
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
 *             required:
 *               - title
 *               - description
 *               - themes
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 description: Title is required
 *                 example: 'New Posts'
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: Binary image file of the cover
 *               description:
 *                 type: string
 *                 minLength: 3
 *                 description: Description is required
 *                 example: 'Description of the new posts'
 *               themes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 minItems: 1
 *                 description: At least one theme is required. Themes not empty
 *               content:
 *                 type: string
 *                 format: uri
 *                 description: URL of the video content
 *               contentFiles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: At least one content item is required. Content can be strings or files.
 *     responses:
 *       '201':
 *         description: Post created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
postsRouter.post(
  '/',
  authMiddleware,
  validatePermission({ requiredPermissions: [PermissionEnum.C] }),
  uploadMulter.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'contentFiles', maxCount: 2 },
  ]),
  validateSchema(PostsValidatorSchema),
  postsController.create.bind(postsController)
)

export default postsRouter
