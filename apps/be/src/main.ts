import express from 'express';
import cors from 'cors';
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

// CORS options to allow requests from the frontend origin
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin to access
  optionsSuccessStatus: 200, // For legacy browser support
};

// Use CORS with the specified options
app.use(cors(corsOptions));

// Function to start the server
const startServer = async () => {
  await connectToDatabase(); // Ensure database connection
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.use(bodyParser.json()); // Body parser should come before the routes
  app.use('/api/users', userRouter);
  app.use(errorHandler);

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);
  });
  server.on('error', console.error);

  process.on('SIGINT', () => {
    console.log('Closing database connection and shutting down the server...');
    server.close(() => {
      console.log('Server shut down.');
      process.exit(0);
    });
  });
};

startServer().catch(console.error);
