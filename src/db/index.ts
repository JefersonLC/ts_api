import { DataSource } from 'typeorm';
import { config } from '../config';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  username: config.dbUser,
  password: config.dbPassword,
  port: Number(config.dbPort),
  database: config.dbName,
  entities: [User],
  logging: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: true
  }
});
