import express, { Request, Response } from 'express';
import { ReqBody } from './interfaces/iIndex';

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    hola: 'mundo',
  });
});

app.post('/', (req: Request, res: Response) => {
  const body: ReqBody = req.body;
  res.json(body);
});
