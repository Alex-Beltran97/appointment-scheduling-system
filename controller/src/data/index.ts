import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Company, Contract, Employee, DocType, EmployeeRole, PaymentStatus, Plan, Suscription, Payment } from '../models/core';
import { Profile, UserRole } from '../models/auth';

const coreEntities = [
  Company,
  Contract,
  Employee,
  DocType,
  EmployeeRole,
  PaymentStatus,
  Plan,
  Suscription,
  Payment
];

const authEntities = [
  UserRole,
  Profile
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
    ...coreEntities,
    ...authEntities
  ],
  migrations: [],
  subscribers: [],
});