import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: `.env.production` });
config({ path: `.env.development`, override: true });
config({ path: `.env.local`, override: true });

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/**/entities/*{.ts, .js}'],
  migrationsTableName: 'migrations',
  migrations: ['./**/migrations/**/[0-9]*.ts'],
});
