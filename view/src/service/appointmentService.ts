import type { Appointment } from '../types/Shared/Service';
import api from './api';

type appointmentParams = {
  id_consultant?: string | number | undefined;
  id_status?: string | number | undefined;
  id_service?: string | number | undefined;
  id_appointment?: string | number | undefined;
  date?: string | number | undefined;
};

export const getAppointments = ({id_consultant, id_status, id_service, date, id_appointment}: appointmentParams) => {
  return api.get(
      `/appointment?consultant_id=${id_consultant || ''}&status_id=${id_status || ''}&date=${date || ''}&service_id=${id_service || ''}&appointment_id=${id_appointment || ''}`
    );
};

export const getAppointmentById = (id: string) => {
  return api.get(`/appointment/${id}`);
};

export const completeAppointmentById = (id: string | number | undefined) => {
  return api.get(`/appointment/complete/${id}`);
};

export const createAppointment = (payload: Appointment) => {
  return api.post('/appointment', payload);
};

export const deleteAppointment = (id?: string | number | undefined) => {
  return api.delete(`/appointment/${id}`);
};