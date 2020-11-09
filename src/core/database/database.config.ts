import * as dotenv from 'dotenv';

import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    dialect: 'sqlite',
    host: 'localhost',
    storage: 'db.sqlite',
  },
  test: {
    dialect: 'sqlite',
    host: 'localhost',
    storage: 'db.sqlite',
  },
  production: {
    dialect: 'sqlite',
    host: 'localhost',
    storage: 'db.sqlite',
  },
};