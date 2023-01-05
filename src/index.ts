import 'reflect-metadata';
import express, { Request, Response } from 'express';
// import { ReqBody } from './interfaces/iIndex';
import { AppDataSource } from './db';
import { User } from './db/entities/User';

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

app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(User).find()
  res.status(200).json(users);
});

app.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  const user = AppDataSource.getRepository(User).create(body)
  const result = await AppDataSource.getRepository(User).save(user)
  res.json(result)
});
