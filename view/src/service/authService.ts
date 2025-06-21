import type { Login, Profile } from '../types/auth/Register';
import api from './api';

export const register = (payload: Profile) => {
  return api.post('/profile', payload);
};

export const login = (payload: Login) => {
  return api.post('/profile/login', payload, {withCredentials: true});
};

export const loginVerify = () => {
  return api.get('/profile/login', {withCredentials: true});
};

export const logout = () => {
  return api.post('/profile/logout', {}, {withCredentials: true});
};