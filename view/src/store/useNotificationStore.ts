import { create } from 'zustand';
import { type AlertColor } from '@mui/material';

type NotificationState = {
  open: boolean;
  message: string;
  severity: AlertColor;
  showNotification: (message: string, severity?: AlertColor) => void;
  closeNotification: () => void;
};

export const useNotificationStore = create<NotificationState>(set => ({
  open: false,
  message: '',
  severity: 'info',
  
  showNotification: (message, severity = 'info') => set({
    open: true,
    message,
    severity
  }),
  
  closeNotification: () => set({
    open: false,
    message: '',
    severity: 'info'
  })
}));