import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './db';
import { apiRouter } from './routes';
import { boomError, logError, ormError, syntaxError } from './middlewares/errors';

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

import './middlewares/passport';

app.use('/api/store/', apiRouter);

app.use(logError);
app.use(ormError);
app.use(boomError);
app.use(syntaxError)