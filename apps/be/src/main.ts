import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as path from 'path';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares';
import { userRouter } from './routes';
import { swaggerConfig } from './utils';
import { connectToDatabase } from './db';

const app = express();

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerConfig);

// Function to start the server
const startServer = async () => {
  // Call connectToDatabase from db.ts to ensure database connection
  await connectToDatabase(); // This replaces the mongoose.connect call
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.use('/api/users', userRouter);
  app.use(bodyParser.json());
  app.use(errorHandler);

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);
  });
  server.on('error', console.error);

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('Closing database connection and shutting down the server...');
    // Assuming db.ts exports a client or a close function, call it here to close the connection
    // For example: client.close();
    server.close(() => {
      console.log('Server shut down.');
      process.exit(0);
    });
  });
};

startServer().catch(console.error);
