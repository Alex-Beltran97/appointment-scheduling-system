import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { AppSource } from '../data';
import { DataSource } from 'typeorm';
import cookieParser from 'cookie-parser';

import { 
  companyRouter, contractRouter, employeeRouter, docTypeRouter,
  employeeRoleRouter, paymentStatusRouter, planRouter, suscriptionRouter,
  paymentRouter
} from '../routers/core';
import { profileRouter, userRoleRouter, loginRouter } from '../routers/auth';
import { config } from '../config';
import { appointmentRoute, appointmentStatusRoute, availableSlotRoute, consultantAvailabilityRoute, consultantExceptionRoute, consultantServiceRoute, slotGeneratorRoute } from '../routers/consultant';
import { searchControllerRoute } from '../routers/client';

class Server {
  private readonly app : Application = express();
  private readonly PORT : String = config.server.port || '3001';
  private readonly API_PATH : String = '/api/v1';

  constructor() {
    this._middlewares();
    this._routes();
  };

  private _middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }));
    this.app.use(cookieParser());
  }

  private _routes() {
    this._authRoutes();
  };

  private _authRoutes() {
    this.app.use(`${this.API_PATH}/company`, companyRouter);
    this.app.use(`${this.API_PATH}/contract`, contractRouter);
    this.app.use(`${this.API_PATH}/employee`, employeeRouter);
    this.app.use(`${this.API_PATH}/doc-type`, docTypeRouter);
    this.app.use(`${this.API_PATH}/employee-role`, employeeRoleRouter);
    this.app.use(`${this.API_PATH}/user-role`, userRoleRouter);
    this.app.use(`${this.API_PATH}/profile`, profileRouter);
    this.app.use(`${this.API_PATH}/payment-status`, paymentStatusRouter);
    this.app.use(`${this.API_PATH}/plan`, planRouter);
    this.app.use(`${this.API_PATH}/suscription`, suscriptionRouter);
    this.app.use(`${this.API_PATH}/payment`, paymentRouter);
    this.app.use(`${this.API_PATH}/login`, loginRouter);
    this.app.use(`${this.API_PATH}/services`, consultantServiceRoute);
    this.app.use(`${this.API_PATH}/generate-slots`, slotGeneratorRoute);
    this.app.use(`${this.API_PATH}/availabilities`, consultantAvailabilityRoute);
    this.app.use(`${this.API_PATH}/exceptions`, consultantExceptionRoute);
    this.app.use(`${this.API_PATH}/appointment`, appointmentRoute);
    this.app.use(`${this.API_PATH}/available-slots`, availableSlotRoute);
    this.app.use(`${this.API_PATH}/search`, searchControllerRoute);
    this.app.use(`${this.API_PATH}/appointment-status`, appointmentStatusRoute);
  }

  private _dbInitializer() : Promise<DataSource>{
    console.log('Data Source initialized');
    return AppSource.initialize();
  }

  public async listen() {
    try {
      await this._dbInitializer();
      this.app.listen(this.PORT, () => {
        console.log(`Server is running on port http://localhost:${this.PORT}`);
      });      
    } catch (error) {
      console.error('Error during Data Source initialization', error);
    };
  };
};

export default Server;