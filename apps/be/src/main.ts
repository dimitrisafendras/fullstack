/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares';
import { userRouter } from './routes';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());

app.use('/api/users', userRouter);

app.use(errorHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
