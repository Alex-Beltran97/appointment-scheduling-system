import type { ServicePayload } from '../types/Shared/Service';
import api from './api';

export const getServices = () => {
  return api.get('/services'); 
};

export const getServiceById = (id: string | number | undefined) => {
  return api.get(`/services/${id}`); 
};

export const createService = (payload: ServicePayload) => {
  return api.post('/services', payload); 
};

export const updateService = (id: string | number | undefined, payload: Partial<ServicePayload>) => {
  if (!id) {
    throw new Error('Service ID is required for update');
  };
  return api.patch(`/services/${id}`, payload); 
};

export const deleteService = (id: string | number | undefined) => {
  if (!id) {
    throw new Error('Service ID is required for deletion');
  };
  return api.delete(`/services/${id}`); 
};