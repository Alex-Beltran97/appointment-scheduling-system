import { Alert, Snackbar } from '@mui/material';
import { useNotificationStore } from '../../../store/useNotificationStore';

const NotificationManager = () => {
  const {open, message, severity, closeNotification} = useNotificationStore();

  return (<>
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={closeNotification}
        severity={severity}
        sx={{ width: '100%' }}
      >
        { message }
      </Alert>
    </Snackbar>
  </>);
};

export default NotificationManager;