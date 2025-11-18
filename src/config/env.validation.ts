import Joi from 'joi';
import { NodeEnv } from '../common/enums/node-env.enum';

export const envValidation = Joi.object({
  NODE_ENV: Joi.string().valid(...Object.values(NodeEnv)),

  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});

export interface EnvConfig {
  NODE_ENV: NodeEnv;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
}
