// Swagger definition
import { UserSchema } from '../models';

export const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3333/api',
      },
    ],
  },
  apis: ['./apps/be/src/routes/*.ts', './apps/be/src/controllers/*.ts'],
  components: {
    schemas: {
      User: UserSchema,
    },
  },
};
//our current IP address (2.84.0.227)
//dimitrisafendras;
//fJOqt51hi3rzuKAX
