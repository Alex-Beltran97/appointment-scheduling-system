import { Badge, IconButton } from "@mui/material";

import { Menu, MenuItem } from "@mui/material";
// import { useEffect, useState, type SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";

import NotificationsIcon from '@mui/icons-material/Notifications';

import socket from '../../../service/socket';
import type { NotificationMsg } from "../../../types/Shared/Service";
import { useNotification } from "../../../store/useNotification";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNotificationStore } from "../../../store/useNotificationStore";


const NotificationComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {idUser} = useAuthStore();

  const {notifications, getUnreadedNotifications, markAllAsRead, cleanNotifications} = useNotification();
  const {showNotification} = useNotificationStore();
  
  const fetchNotifications = useCallback(async () => {
    try {
      await getUnreadedNotifications(idUser);

      if (notifications.length > 0) {
        showNotification(`You have ${notifications.length} new notifications`, 'info');
      };
    } catch (error) {
      showNotification('Error fetching notifications', 'error');
      console.error('Error fetching notifications:', error);
    }
  },
    [getUnreadedNotifications, idUser, notifications.length, showNotification]
  );

  useEffect(() => {
    socket.on('new_notification', fetchNotifications);

    return () => {
      socket.off('new_notification', fetchNotifications);
    };
  }, [fetchNotifications]);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead(idUser);
      showNotification('All notifications marked as read', 'success');
    } catch (error) {
      showNotification('Error marking notifications as read', 'error');
      console.error('Error marking notifications as read:', error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    handleMarkAllAsRead();
    getUnreadedNotifications(idUser);
  };

  const handleClose = () => {
    setAnchorEl(null);
    cleanNotifications();
  };

  return (<>
    <IconButton
      color="inherit"
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <Badge badgeContent={notifications.length} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={notifications.length > 0 && open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxHeight: 300,
          maxWidth: 400, 
          overflowY: 'auto',
          padding: 1
        }
      }}
      slotProps={{
        list: {
          'aria-labelledby': 'basic-button',
        },
      }}
    >
      {notifications.map((notification: NotificationMsg, index) => (
        <MenuItem
          key={index}
          sx={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 4,
          }}
        >
          {notification.message}
          <br />
          <small>{new Date(notification.created_at).toLocaleString()}</small>
        </MenuItem>
      ))}
    </Menu>
  </>);
};

export default NotificationComponent;