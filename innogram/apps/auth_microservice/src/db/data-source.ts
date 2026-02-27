import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!url) throw new Error('DATABASE_URL or POSTGRES_URL is missing');

export const AppDataSource = new DataSource({
  type: 'postgres',
  url,
  synchronize: false,
  logging: ['error', 'warn'],
  entities: ['apps/auth_microservice/src/**/*.entity.{ts,js}'],
  migrations: ['apps/auth_microservice/src/db/migrations/*.{ts,js}'],
});
