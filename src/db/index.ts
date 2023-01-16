import { DataSource } from 'typeorm';
import { config } from '../config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  username: config.dbUser,
  password: config.dbPassword,
  port: Number(config.dbPort),
  database: config.dbName,
  entities: [`${__dirname}/entities/*.{js,ts}`],
  migrations: [`${__dirname}/migrations/*.{js,ts}`],
  ssl: {
    rejectUnauthorized: true,
  },
});
