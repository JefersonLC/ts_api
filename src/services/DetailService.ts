// import boom from '@hapi/boom';
import ShortUniqueId from 'short-unique-id';
import { InsertResult } from 'typeorm';
import { AppDataSource } from '../db';
import { Detail } from '../db/entities/Detail';
import { NewDetail } from '../types/detail';

const uid: ShortUniqueId = new ShortUniqueId({ length: 10 });

export default class DetailService {
  // async findById(id: string): Promise<Detail> {
  //   const detail: Detail | null = await AppDataSource.getRepository(
  //     Detail
  //   ).findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   if (!detail) {
  //     throw boom.notFound('Detail not found');
  //   }
  //   return detail;
  // }

  async createDetail(data: NewDetail): Promise<InsertResult> {
    const details = data.map((detail) => {
      return {
        id: uid(),
        ...detail,
      };
    });
    const result: InsertResult | NewDetail =
      await AppDataSource.createQueryBuilder()
        .insert()
        .into(Detail)
        .values(details)
        .execute();
    return result;
  }

  // async deleteDetail(id: string) {
  //   const detail = await this.findById(id);
  //   const result: Detail = await AppDataSource.getRepository(Detail).remove(
  //     detail
  //   );
  //   return result;
  // }
}
