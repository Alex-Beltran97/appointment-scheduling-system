import { create } from 'zustand';
import type { AvailabilityPayload, Service, ServicePayload } from '../types/Shared/Service';
import { getServices, createService, getServiceById, updateService, deleteService } from '../service/consultantServicesService'
import { getServiceAvailabilitySlots, type param } from '../service/slotAvailabilitiesService';
import { createAvailability, getServiceAvailability, updateAvailability } from '../service/availabilitiesService';

type ServiceState = {
  services: Service[];
  service: Service | null;
  createService: (service: ServicePayload) => void;
  getServices: (consultantId: string | number | undefined) => void;
  getServiceById: (id: string | number | undefined) => void;
  updateServiceById: (id: string | number | undefined, payload: Partial<ServicePayload>) => void;
  getAvailabilitySlots: (serviceId?: param, date?: param) => void;
  getAvailability: (serviceId?: param) => void;
  createAvailability: (payload: AvailabilityPayload) => void;
  updateAvailability: (id: string | number | undefined, payload: AvailabilityPayload) => void;
  deleteServiceById: (id: string | number | undefined) => void;
};

export const useServiceStore = create<ServiceState>(set => ({
  services: [],
  service: null,
  getServices: async (consultantId: string | number | undefined) => {
    try {
      const {data} = await getServices(consultantId);
      console.log(data?.response);
      set({ services: data?.response || [] });
      return Promise.resolve(data?.response || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },
  getServiceById: async (id: string | number | undefined) => {
    try {
      const {data} = await getServiceById(id);
      if (!data || !data.response) {
        throw new Error('Service not found');
      };
      set({ service: data.response });
      return data?.response || null;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },
  updateServiceById: async (id: string | number | undefined, payload: Partial<ServicePayload>) => {
    try {
      const {data} = await updateService(id, payload);
      return data?.response || null;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },
  createService: async (service: ServicePayload) => {
    return createService(service);
  },
  getAvailabilitySlots: async (serviceId?: param, date?: param) => {
    try {
      const { data } = await getServiceAvailabilitySlots(serviceId, date);
      return data?.response || [];
    } catch (error) {
      console.error('Error fetching service availability:', error);
      throw error;
    }
  },
  getAvailability: async (serviceId?: param) => {
    try {
      const { data } = await getServiceAvailability(serviceId);
      return data?.response || [];
    } catch (error) {
      console.error('Error fetching service availability:', error);
      throw error;
    }
  },
  deleteServiceById: async (id: string | number | undefined) => {
    try {
      if (!id) {
        throw new Error('Availability ID is required for deletion');
      }
      const { data } = await deleteService(id);
      return data?.response || [];
    } catch (error) {
      console.error('Error deleting availability:', error);
      throw error;
    }
  },
  createAvailability: async (payload: AvailabilityPayload) => {
    try {
      const { data } = await createAvailability(payload);
      return data?.response || [];
    } catch (error) {
      console.error('Error creating availability:', error);
      throw error;
    }
  },
  updateAvailability: async (id, payload) => {
    try {
      const { data } = await updateAvailability(id, payload);
      return data?.response || [];
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    }
  },
})); 