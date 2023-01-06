import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ShortUniqueId from 'short-unique-id';
import { config } from '../config';
import { AppDataSource } from '../db';
import { User } from '../db/entities/User';
import { NewUser } from '../types/user';

const uid: ShortUniqueId = new ShortUniqueId({ length: 10 });

export default class UserService {
  async find(): Promise<User[]> {
    const users: User[] = await AppDataSource.getRepository(User).find({
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        isAdmin: true,
        verified: true,
      },
    });
    return users;
  }

  async findById(id: string): Promise<User[]> {
    const user: User[] = await AppDataSource.getRepository(User).find({
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        isAdmin: true,
        verified: true,
      },
      where: {
        id: id,
      },
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async isDuplicated({ email }: NewUser): Promise<User | null> {
    const user: User | null = await AppDataSource.getRepository(User).findOneBy(
      {
        email: email,
      }
    );
    return user;
  }

  async create(data: NewUser): Promise<User> {
    const isDuplicated: User | null = await this.isDuplicated(data);
    if (isDuplicated) {
      throw boom.conflict('The email is already registered');
    }
    const hash = bcrypt.hashSync(data.password, 10);
    const token = jwt.sign(
      {
        name: data.name,
        lastname: data.lastname,
      },
      encodeURIComponent(`${config.secret}`)
    );
    const user = AppDataSource.getRepository(User).create({
      id: uid(),
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: hash,
      token: token,
    });
    const result = await AppDataSource.getRepository(User).save(user);
    return result;
  }

  // async findByRole(value: boolean) {
  //   const users: User[] = await AppDataSource.getRepository(User).find({
  //     select: {
  //       id: true,
  //       name: true,
  //       lastname: true,
  //       email: true,
  //       isAdmin: true,
  //       verified: true,
  //     },
  //     where: {
  //       isAdmin: value,
  //     },
  //   });
  //   return users;
  // }
}
