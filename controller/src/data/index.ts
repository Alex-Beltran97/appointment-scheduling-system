import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Company, Contract, Employee, DocType, EmployeeRole, PaymentStatus, Plan, Suscription, Payment, ActiveContractView } from '../models/core';
import { Appointment, AppointmentStatus, AvailableSlot, ConsultantAvailability, ConsultantException, ConsultantNotification, ConsultantService, NotificationType } from '../models/consultants';
import { Profile, ProfileImg, UserRole } from '../models/auth';
import { config } from '../config';
import {join} from 'path';

const coreEntities = [
  Company,
  Contract,
  Employee,
  DocType,
  EmployeeRole,
  PaymentStatus,
  Plan,
  Suscription,
  Payment,
  ActiveContractView
];

const authEntities = [
  UserRole,
  Profile,
  ProfileImg
];

const consultantEntities = [
  Appointment,
  AppointmentStatus,
  AvailableSlot,
  ConsultantAvailability,
  ConsultantException,
  ConsultantService,
  NotificationType,
  ConsultantNotification
];

export const AppSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: 5432,
  username: config.database.username,
  password: config.database.password,
  database: 'appointment-scheduling-system-db',
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [
    ...coreEntities,
    ...authEntities,
    ...consultantEntities
  ],
  migrations: [join(__dirname, '../migrations/*{.ts, .js}')],  
  subscribers: [],
});