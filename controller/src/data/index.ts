import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Company, Contract, Employee, DocType, EmployeeRole, PaymentStatus, Plan, Suscription, Payment } from '../models/core';
import { Profile, UserRole } from '../models/auth';
import { config } from '../config';

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
  host: config.database.host,
  port: 5432,
  username: config.database.username,
  password: config.database.password,
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