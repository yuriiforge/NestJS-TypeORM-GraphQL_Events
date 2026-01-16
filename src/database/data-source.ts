import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { NodeEnv } from '../common/enums/node-env.enum';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
  migrations: [join(__dirname, 'migrations', '*.{js,ts}')],
  synchronize: process.env.NODE_ENV === NodeEnv.Production ? false : true,
});
