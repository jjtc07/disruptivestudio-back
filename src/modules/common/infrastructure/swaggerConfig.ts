import swaggerJSDoc, { Options } from 'swagger-jsdoc'

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3003/api/v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        SignIn: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'example@example.com',
            },
            password: {
              type: 'string',
              example: '',
            },
          },
        },
        SignUp: {
          type: 'object',
          required: ['username', 'email', 'password', 'role'],
          properties: {
            username: {
              type: 'string',
              example: 'example',
            },
            email: {
              type: 'string',
              example: 'example@example.com',
            },
            password: {
              type: 'string',
              example: '',
            },
            role: {
              type: 'string',
              example: '6666d2d19018f7e9cda50e96',
            },
          },
        },
        UserToken: {
          type: 'object',
          required: ['username', 'email', 'password', 'role'],
          properties: {},
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
          },
        },
        Post: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            coverUrl: {
              type: 'string',
              format: 'url',
            },
            createBy: {
              type: 'string',
              format: 'url',
            },
          },
        },
      },
    },
  },
  apis: ['./src/modules/**/infrastructure/**/index.ts'],
}

export const swaggerDocs = swaggerJSDoc(options)
