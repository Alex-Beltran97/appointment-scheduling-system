import api from './api';

export type param = string | number | null | undefined;

export const getServiceAvailabilitySlots = (serviceId?: param, date?: param) => {
  return api.get(`/available-slots?service_id=${serviceId}&date=${date}`);
};