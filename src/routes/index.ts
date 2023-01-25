import { Router } from 'express';
import passport from 'passport';
import { userRouter } from './userRouter';
import { categoryRouter } from './categoryRouter';
import { productRouter } from './productRouter';
import { orderRouter } from './orderRouter';
import { authUser, verifyUserEmail } from '../controllers/UserController';
import { requestValidator } from '../middlewares/validator';
import { logInUserSchema } from '../db/schemas/userSchema';
import { request } from '../types/requestEnum';

import multer from 'multer';
import fs from 'fs';
import path from 'path'
import boom from '@hapi/boom';

export const apiRouter: Router = Router();

apiRouter.post(
  '/login',
  requestValidator(request.body, logInUserSchema),
  passport.authenticate('local', { session: false }),
  authUser
);
apiRouter.get('/verify', verifyUserEmail);
apiRouter.use('/users', userRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/orders', orderRouter);


const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    const root = path.resolve(__dirname, '../..')
    const dir = path.join(root, '/public/images/products');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

apiRouter.post('/img', 
upload.single('image'), (req, res) => {
  console.log(req.body,req.file);
  if(!req.file) {
    throw boom.badRequest('se esperaba una imagen')
  }
  res.json({
    res: 'success'
  });
});
