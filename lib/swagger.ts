import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Financial Management API',
      version: '1.0.0',
      description:
        'API documentation for the financial management system with RBAC support.',
    },
    servers: [
      {
         url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
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
    },
  },
  apis: [
    './pages/api/**/*.ts',
    './modules/**/*.ts',
  ],
};
