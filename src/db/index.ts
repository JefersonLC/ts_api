import { DataSource } from 'typeorm';
import { config } from '../config';
import { Category } from './entities/Category';
import { Order } from './entities/Order';
import { Product } from './entities/Product';
import { Detail } from './entities/Detail';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  username: config.dbUser,
  password: config.dbPassword,
  port: Number(config.dbPort),
  database: config.dbName,
  entities: [Category, Product, User, Order, Detail],
  logging: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: true,
  },
});
