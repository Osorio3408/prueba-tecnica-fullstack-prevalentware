import { OpenAPIV3 } from 'openapi-types'

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Financial Management API',
    version: '1.0.0',
    description:
      'API documentation for the financial management system with RBAC support.',
  },

  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    },
  ],

  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'better-auth.session_token',
      },
    },

    schemas: {
      Movement: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'mov_123' },
          concept: { type: 'string', example: 'Salary' },
          amount: { type: 'number', example: 2500 },
          type: {
            type: 'string',
            enum: ['INCOME', 'EXPENSE'],
            example: 'INCOME',
          },
          date: {
            type: 'string',
            format: 'date-time',
            example: '2026-02-22T10:00:00Z',
          },
          user: {
            $ref: '#/components/schemas/User',
          },
        },
      },

      CreateMovementDTO: {
        type: 'object',
        required: ['concept', 'amount', 'type', 'date'],
        properties: {
          concept: { type: 'string', example: 'Freelance Project' },
          amount: { type: 'number', example: 1200 },
          type: {
            type: 'string',
            enum: ['INCOME', 'EXPENSE'],
            example: 'INCOME',
          },
          date: {
            type: 'string',
            format: 'date-time',
            example: '2026-02-22T15:00:00Z',
          },
        },
      },

      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'usr_123' },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john@example.com' },
          phone: { type: 'string', nullable: true, example: '3001234567' },
          role: {
            type: 'string',
            enum: ['ADMIN', 'USER'],
            example: 'ADMIN',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-02-22T12:00:00Z',
          },
        },
      },

      UpdateUserDTO: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'John Updated' },
          phone: { type: 'string', example: '3009998888' },
          role: {
            type: 'string',
            enum: ['ADMIN', 'USER'],
            example: 'USER',
          },
        },
      },

      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Unauthorized' },
        },
      },
    },
  },

  security: [{ cookieAuth: [] }],

  paths: {
    '/api/movements': {
      get: {
        tags: ['Movements'],
        summary: 'Get all financial movements',
        description: 'Returns all income and expense records.',
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Movement' },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },

      post: {
        tags: ['Movements'],
        summary: 'Create a new movement',
        description: 'Creates a new income or expense (ADMIN only).',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateMovementDTO',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Movement created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Movement',
                },
              },
            },
          },
          403: {
            description: 'Forbidden - ADMIN only',
          },
        },
      },
    },

    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        description: 'Returns list of users (ADMIN only).',
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
          403: {
            description: 'Forbidden - ADMIN only',
          },
        },
      },
    },

    '/api/users/{id}': {
      put: {
        tags: ['Users'],
        summary: 'Update a user',
        description: 'Updates user data (ADMIN only).',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: 'usr_123',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateUserDTO',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          404: {
            description: 'User not found',
          },
        },
      },
    },

    '/api/reports/csv': {
      get: {
        tags: ['Reports'],
        summary: 'Download CSV report',
        description:
          'Generates and downloads financial movements report in CSV format (ADMIN only).',
        responses: {
          200: {
            description: 'CSV file download',
            content: {
              'text/csv': {
                schema: {
                  type: 'string',
                  example: 'concept,amount,type,date\nSalary,2500,INCOME,2026-02-22',
                },
              },
            },
          },
          403: {
            description: 'Forbidden - ADMIN only',
          },
        },
      },
    },
  },
}