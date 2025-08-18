import { Badge, Box, Button, Card, CardContent, ListItem, styled, Typography, type BadgeProps } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import styles from './ServiceComponent.module.css';
import type { Appointment, Availability, Service } from "../../../../types/Shared/Service";
import { useCallback, useEffect, useState } from "react";
import { useServiceStore } from "../../../../store/useServiceStore";
import { getHourFormat, getWeekDayName } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import { useAppointmentStore } from "../../../../store/useAppointment";
import { useNotificationStore } from "../../../../store/useNotificationStore";
import socket from "../../../../service/socket";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -16,
    top: 12,
  },
}));

interface Props {
  service: Service;
}

const ServiceComponent = ({service}: Props) => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([])

  const {getAvailability} = useServiceStore();

  const {getAppointments} = useAppointmentStore();
  const {showNotification} = useNotificationStore();

  const handleGetAvailability = useCallback( async () => {
    try {
      const result = await (getAvailability(service.id) as unknown) as Availability[];
      setAvailabilities(result);
      if (result.length === 0) {
        showNotification('No hay disponibilidades para este servicio.', 'info');
      } else {
        await getAppointments({id_service: service.id});
      }
    } catch (error) {
      showNotification('No se pudieron obtener las disponibilidades del servicio. Inténtalo más tarde.', 'error');
      console.error('Error fetching availability:', error);
    }
  }, [getAvailability, getAppointments, service.id, showNotification]);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetAvailability();
  }, [handleGetAvailability]);

  const [appointmentsCounter, setAppointmentsCounter] = useState(0);

  const handleGetAppointments = useCallback(async () => {
    try {
      const result = await (getAppointments({
        id_service: service.id,
        id_consultant: service.consultant.id
      }) as unknown) as Appointment[];
      const filteredAppointments = result?.filter((item: Appointment) => item.is_active);
      setAppointmentsCounter(filteredAppointments.length);
    } catch (error) {
      showNotification('No se pudieron obtener las citas. Inténtalo más tarde.', 'error');
      console.error('Error fetching appointments:', error);      
    }
  }, [getAppointments, service.consultant.id, service.id, showNotification]);

  useEffect(() => {
    handleGetAppointments();

    socket.on('new_notification', handleGetAppointments);

    return () => {
      socket.off('new_notification', handleGetAppointments);
    };
  }, [handleGetAppointments]);

  return (<ListItem>
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="h4" textAlign='center' gutterBottom>
          {service.name || 'Servicio sin nombre'}
        </Typography>
        <Typography variant="body1" component="h6" gutterBottom>
          Descripcion
        </Typography>
        <Typography variant="body2" component="h6" gutterBottom>
          {service.description || 'No hay descripcion disponible'}
        </Typography>
        <Box className={styles.schedule__item}>
          <Typography variant="body2" component="h6">
            Tarifa
          </Typography>
          <Typography variant="body2" component="h6">
            ${service.price} COP
          </Typography>
        </Box>
        <Typography variant="body1" component="h6" textAlign='center' gutterBottom>
          Horarios
        </Typography>
        {availabilities.map((availability) => (
          <Box key={availability.id} className={styles.schedule__item}>
            <Typography variant="body2" component="h6">
              {getWeekDayName(availability.weekday)}
            </Typography>
            <Typography variant="body2" component="h6">
              {getHourFormat(availability.start_time)} - {getHourFormat(availability.end_time)}
            </Typography>
          </Box>
        ))}
        <Button
          onClick={() => navigate(`/my-schedules?service-id=${service.id}`)}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          <StyledBadge badgeContent={appointmentsCounter} color="error">
            Gestionar agenda
          </StyledBadge>
        </Button>
        <Button
          onClick={() => navigate(`/create-service/${service.id}`)}
          variant="contained"
          color="secondary"
          fullWidth sx={{
            marginTop: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          Administrar servicio
          <BorderColorIcon sx={{width: '1rem'}} />
        </Button>
      </CardContent>
    </Card>
  </ListItem>);
};

export default ServiceComponent;