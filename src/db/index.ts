import { Sequelize } from 'sequelize';
import { config } from '../config/index';

export const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: true,
  dialectOptions: {
    ssl: {
      rejectUnathorized: true,
    },
  },
});
