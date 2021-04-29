import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { join } from 'path';
import { createStream } from 'rotating-file-stream';

import connectDB from './src/db';
import setup from './src/swagger';

const app = express();

const { UI_URL, PORT, NODE_ENV } = process.env;
const port = PORT;
const basePath = '/api';
const isProduction = NODE_ENV === 'production';

// logs
if (isProduction) {
  const accessLogStream = createStream('access.log', {
    interval: '7d',
    path: join(__dirname, 'log'),
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  app.use(morgan('dev'));
}

app.use(cors({ credentials: true, origin: UI_URL }));
app.use(json());

connectDB();

app.use(basePath, import('./src/controllers'));

app.get(`${basePath}/ping`, (_req, res) => {
  res.send('pong');
});

if (!isProduction) {
  setup(app); // swagger UI
  console.log(`API is running in http://localhost:${port}/api`);
}

app.listen(port);
