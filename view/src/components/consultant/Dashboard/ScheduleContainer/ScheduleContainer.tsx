import { Box, Grid, List, Typography } from "@mui/material";
import ServiceComponent from "../ScheduleComponent/ServiceComponent";
import { useCallback, useEffect } from "react";
import { useServiceStore } from "../../../../store/useServiceStore";
import { useAuthStore } from "../../../../store/useAuthStore";
import socket from "../../../../service/socket";
import { useNotificationStore } from "../../../../store/useNotificationStore";

const ScheduleContainer = () => {
  const {services, getServices} = useServiceStore();
  const {idUser} = useAuthStore();

  const {showNotification} = useNotificationStore();

  const handleGetServices = useCallback(async () => {
    try {
      await getServices(idUser);
      showNotification('Servicios actualizados', 'success');      
    } catch (error) {
      showNotification('Error al obtener los servicios', 'error');
      console.error('Error fetching services:', error);
    }
  },[getServices, idUser, showNotification]);

  useEffect(() => {
    handleGetServices();

    socket.on('new_notification', handleGetServices);

    return () => {
      socket.off('new_notification', handleGetServices);
    };
  }, [handleGetServices]);

  return (<List>
    <Grid container spacing={2} columns={12}>
      {services.length ? services.map(service => (
        <Grid key={service.id} size={6}>
          <ServiceComponent service={service} />
        </Grid>
      ))
      : <Grid size={12}>
          <Box sx={{ minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" align="center" color="textSecondary">
              No hay servicios creados aún
            </Typography>
          </Box>
        </Grid>
      }
    </Grid>
  </List>);
};

export default ScheduleContainer;