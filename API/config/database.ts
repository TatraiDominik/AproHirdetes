import { DataSource } from 'typeorm';
import { appConfig } from './config';
import { User } from '../models/user.model';
import { Advertisement } from '../models/advertisements.model';

const { appDb } = appConfig;


const dataSource = new DataSource({
  type: 'mysql',
  host: appDb.host,
  port: appDb.port, 
  username: appDb.user,
  password: appDb.password,
  database: appDb.database,
  synchronize: true, 
  logging: appDb.logging,
  entities: [
    User,
    Advertisement
  ],
  migrations: [],
  subscribers: [],
});

export { dataSource };
