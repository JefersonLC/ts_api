import { Router } from 'express';
import { createDetail } from '../controllers/DetailController';
import { createDetailSchema } from '../db/schemas/detailSchema';
import { bodyValidator } from '../middlewares/validator';

export const detailRouter: Router = Router();

detailRouter.post('/', bodyValidator(createDetailSchema), createDetail);

// detailRouter.get('/id/:id', paramsValidator(getOrderSchema), getOrderById);

// detailRouter.delete('/id/:id', paramsValidator(getOrderSchema), deleteOrder);
