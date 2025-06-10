import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Company, Contract, Employee, DocType, EmployeeRole } from '../models/auth';

const authEntities = [
  Company,
  Contract,
  Employee,
  DocType,
  EmployeeRole
];

export const AppSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Admin1234*',
  database: 'appointment-scheduling-system-db',
  synchronize: true,
  logging: false,
  entities: [
    ...authEntities
  ],
  migrations: [],
  subscribers: [],
});