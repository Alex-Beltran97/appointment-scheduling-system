import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import { AppSource } from '../data';
import { DataSource } from 'typeorm';
config();

import { companyRouter, contractRouter, employeeRouter, docTypeRouter, employeeRoleRouter } from '../routers/auth';

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