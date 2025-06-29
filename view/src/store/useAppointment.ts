import { create } from 'zustand';
import type { Appointment } from '../types/Shared/Service';
import { completeAppointmentById, createAppointment, deleteAppointment, getAppointmentById, getAppointments } from '../service/appointmentService';

type appointmentParams = {
  id_consultant?: string | number | undefined;
  id_status?: string | number | undefined;
  id_service?: string | number | undefined;
  date?: string | number | undefined;
};

interface AppointmentStore {
  appointments: Appointment[];
  createAppointment: (payload: Appointment) => Promise<void>;
  getAppointments: (params: appointmentParams) => Promise<void>;
  getAppointmentById: (id: string) => Promise<void>;
  completeAppointmentById: (id: string | number | undefined) => Promise<void>;
  deleteAppointment: (id?: string | number | undefined) => Promise<void>;
};

export const useAppointmentStore = create<AppointmentStore>(set => ({
  appointments: [],
  createAppointment: async (payload: Appointment): Promise<void> => {
    try {
      await createAppointment(payload);
      return Promise.resolve();
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },
  getAppointments: async ({id_status, id_consultant, id_service, date}:appointmentParams) : Promise<void> => {
    try {
      const { data } = await getAppointments({
        id_status,
        id_consultant,
        id_service,
        date
      });
      set({ appointments: data.response });
      return Promise.resolve(data.response);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },
  getAppointmentById: async (id: string) : Promise<void> => {
    try {
      const { data } = await getAppointmentById(id);
      set({ appointments: data.response });
      return Promise.resolve(data.response);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },
  completeAppointmentById: async (id: string | number | undefined): Promise<void> => {
    try {
      await completeAppointmentById(id);
      console.log('Appointment completed successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error completing appointment:', error);
      throw error;      
    }
  },
  deleteAppointment: async (id: string | number | undefined): Promise<void> => {
    try {
      await deleteAppointment(id);
      set(state => ({appointments: state.appointments}));
      console.log('Appointment deleted successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;      
    }
  }
}));