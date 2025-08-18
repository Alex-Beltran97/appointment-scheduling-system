import axios from 'axios';
import { config } from '../config';

const api = axios.create({
  baseURL: `${config.backendUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;