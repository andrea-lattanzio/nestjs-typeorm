import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

dotenv.config();

const configSrv = new ConfigService();

export const postgresDbConfig = new DataSource({
  type: 'postgres',
  host: configSrv.getOrThrow('POSTGRE_HOST'),
  port: configSrv.getOrThrow('POSTGRE_PORT'),
  database: configSrv.getOrThrow('POSTGRE_DATABASE'),
  username: configSrv.getOrThrow('POSTGRE_USERNAME'),
  password: configSrv.getOrThrow('POSTGRE_PASSWORD'),
  synchronize: configSrv.getOrThrow('POSTGRE_SYNC'),
  migrations: ['migrations/**'],
  entities: ['dist/**/*.entity{.ts,.js}'],
});
