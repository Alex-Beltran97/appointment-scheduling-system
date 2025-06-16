import { config as envConfig } from 'dotenv';
envConfig();

export const config = {
  server: {
    port: process.env.PORT,
    cors: {
      frontUrl: process.env.FRONTEND_HOST || 'http://localhost:3000',
    }
  },
  database: {
    host: process.env.PG_DB_HOST,
    username: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PASSWORD
  },
  login: {
    saltRounds: process.env.SALT_ROUNDS,
    jwtKey: process.env.JWT_SECRET_KEY,
  }
};
