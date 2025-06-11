import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Company, Contract, Employee, DocType, EmployeeRole, UserRole, Profile, PaymentStatus, Plan, Suscription } from '../models/auth';

const authEntities = [
  Company,
  Contract,
  Employee,
  DocType,
  EmployeeRole,
  UserRole,
  Profile,
  PaymentStatus,
  Plan,
  Suscription
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