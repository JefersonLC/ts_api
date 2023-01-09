import { Request, Response, NextFunction } from 'express';
import DetailService from '../services/DetailService';
import { NewDetail } from '../types/detail';

const detailService = new DetailService();

// export async function getDetailById(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const { id } = req.params;
//     const order: Order = await detailService.findById(id);
//     res.json(order);
//   } catch (error) {
//     next(error);
//   }
// }

export async function createDetail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: NewDetail = req.body;
    const detail = await detailService.createDetail(data);
    res.json(detail);
  } catch (error) {
    next(error);
  }
}

// export async function deleteDetail(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { id } = req.params;
//     const order = await detailService.deleteOrder(id);
//     res.json(order);
//   } catch (error) {
//     next(error);
//   }
// }
