import type { NotificationPayload } from '../types/Shared/Service';
import api from './api';

export const getUnreadNotifications = async (id: string | number | undefined) => {
  return api.get(`/notifications/unread/${id}`);
};

export const createNotification = async (payload: NotificationPayload) => {
  return api.post(`/notifications`, payload);
};

export const postMarkAsReadNotification = async (id: string | number | undefined) => {
  return api.post(`/notifications/mark-as-read/${id}`);
};