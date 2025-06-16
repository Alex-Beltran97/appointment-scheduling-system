import type { UserRole } from '../types';
import api from './api';

export const userRoles = () : Promise<UserRole> => {
  return api.get('/user-role').then(response => {
    const {response: result} = response.data;
    return result.map((userRole: UserRole) => ({id: userRole.id, role: userRole.role}));
  });
};