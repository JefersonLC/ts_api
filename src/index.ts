import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { AppDataSource } from './db';
import { apiRouter } from './routes';
import { boomError, logError, ormError } from './middlewares/errors';

const app = express();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) =>
    console.error('Error during Data Source initialization:', err)
  );

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    name: 'holaowo',
    keys: ['xdasd', '1231'],
    httpOnly: true,
  })
);

import './middlewares/passport';

app.use('/api/store/', apiRouter);

app.use(logError);
app.use(ormError);
app.use(boomError);
