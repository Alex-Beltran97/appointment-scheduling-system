import type { AvailabilityPayload } from '../types/Shared/Service';
import api from './api';
import type { param } from './slotAvailabilitiesService';

export const getServiceAvailability = (serviceId?: param) => {
  return api.get(`/availabilities?service_id=${serviceId}`);
};

export const createAvailability = (payload: AvailabilityPayload) => {
  return api.post("/availabilities", payload);
};

export const updateAvailability = (id: string | number | undefined, payload: AvailabilityPayload) => {
  return api.patch(`/availabilities/${id}`, payload);
};