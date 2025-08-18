import { create } from 'zustand';
import type { NotificationMsg, NotificationPayload } from '../types/Shared/Service';
import { createNotification, getUnreadNotifications, postMarkAsReadNotification } from '../service/notificationService';

type NotificationState = {
  notifications: NotificationMsg[],
  getUnreadedNotifications: (id: string | number | undefined) => Promise<void>,
  createNotification: (payload: NotificationPayload) => Promise<void>,
  markAllAsRead: (id: string | number | undefined) => Promise<void>,
  cleanNotifications: () => void,
};

export const useNotification = create<NotificationState>(set => ({
  notifications: [],
  getUnreadedNotifications: async (id: string | number | undefined) => {
    try {
      const response = await getUnreadNotifications(id);
      console.log(response.data);
      set({notifications: response.data});
      return Promise.resolve(response.data);
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
      throw error;
    }
  },
  createNotification: async (payload: NotificationPayload) => {
    try {
      const response = await createNotification(payload);
      set(state => ({ notifications: [...state.notifications, response.data] }));
      return Promise.resolve(response.data);
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },
  markAllAsRead: async (id: string | number | undefined) => {
    try {
      await postMarkAsReadNotification(id);
      return Promise.resolve();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      throw error;
    }
  },
  cleanNotifications: () => set({ notifications: [] })
}));