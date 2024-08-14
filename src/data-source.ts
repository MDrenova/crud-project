import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin@admin',
  database: 'mydb',
  migrations: ['src/migration/*.ts'], // Path to migration files
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
});
