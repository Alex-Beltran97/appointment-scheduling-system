import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import { AppSource } from '../data';
import { DataSource } from 'typeorm';
config();

import { 
  companyRouter, contractRouter, employeeRouter, docTypeRouter, employeeRoleRouter,
  userRoleRouter, profileRouter, paymentStatusRouter, planRouter, suscriptionRouter,
  paymentRouter
} from '../routers/core';

class Server {
  public readonly express : Application = express();
  public readonly PORT : String = process.env.PORT || '3001';
  public readonly API_PATH : String = '/api/v1';

  constructor() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(morgan('dev'));
    this.express.use(cors());
    this._routes();
  };

  private _routes() {
    this._authRoutes();
  };
  
  private _authRoutes() {
    this.express.use(`${this.API_PATH}/company`, companyRouter);
    this.express.use(`${this.API_PATH}/contract`, contractRouter);
    this.express.use(`${this.API_PATH}/employee`, employeeRouter);
    this.express.use(`${this.API_PATH}/doc-type`, docTypeRouter);
    this.express.use(`${this.API_PATH}/employee-role`, employeeRoleRouter);
    this.express.use(`${this.API_PATH}/user-role`, userRoleRouter);
    this.express.use(`${this.API_PATH}/profile`, profileRouter);
    this.express.use(`${this.API_PATH}/payment-status`, paymentStatusRouter);
    this.express.use(`${this.API_PATH}/plan`, planRouter);
    this.express.use(`${this.API_PATH}/suscription`, suscriptionRouter);
    this.express.use(`${this.API_PATH}/payment`, paymentRouter);
  }

  private _dbInitializer() : Promise<DataSource>{
    console.log('Data Source initialized');
    return AppSource.initialize();
  }

  public async listen() {
    try {
      await this._dbInitializer();
      this.express.listen(this.PORT, () => {
        console.log(`Server is running on port http://localhost:${this.PORT}`);
      });      
    } catch (error) {
      console.error('Error during Data Source initialization', error);
    };
  };
};

export default Server;