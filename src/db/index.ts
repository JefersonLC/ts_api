import { DataSource } from 'typeorm';
import { config } from '../config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  username: config.dbUser,
  password: config.dbPassword,
  port: Number(config.dbPort),
  database: config.dbName,
  entities: ['src/db/entities/*'],
  migrationsRun: true,
  migrations: ['src/db/migrations/*'],
  ssl: {
    rejectUnauthorized: true,
  },
});
