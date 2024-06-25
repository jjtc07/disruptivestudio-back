import express from 'express'
import { themeController } from './controllers'
import {
  authMiddleware,
  validatePermission,
  validateSchema,
} from '../../../common/infrastructure/middlewares'
import { uploadMulter } from '../../../common/infrastructure/multer'
import { PermissionEnum } from '../../../common/enums'
import { ThemeValidatorSchema } from './validators'

const themeRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Themes V1
 *   description: Operaciones de tematicas
 */

/**
 * @swagger
 * /themes:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all themes
 *     tags:
 *       - Themes V1
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
themeRouter.get('/', themeController.getAllThemes.bind(themeController))

/**
 * @swagger
 * /themes/{themeId}:
 *   get:
 *     summary: Get theme by ID
 *     tags:
 *       - Themes V1
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: themeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the theme
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
themeRouter.get(
  '/:themeId',
  authMiddleware,
  validatePermission({ requiredPermissions: [PermissionEnum.R] }),
  themeController.geThemeById.bind(themeController)
)

/**
 * @swagger
 * /themes:
 *   post:
 *     summary: Create a new theme
 *     tags:
 *       - Themes V1
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Theme object
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: ['name', 'cover', 'description', 'category']
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
 *               category:
 *                 type: string
 *                 description: 'Category id'
 *                 example: '507f1f77bcf86cd799439011'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
themeRouter.post(
  '/',
  authMiddleware,
  validatePermission({ onlyAdmin: true }),
  uploadMulter.single('cover'),
  validateSchema(ThemeValidatorSchema),
  themeController.create.bind(themeController)
)

export default themeRouter
