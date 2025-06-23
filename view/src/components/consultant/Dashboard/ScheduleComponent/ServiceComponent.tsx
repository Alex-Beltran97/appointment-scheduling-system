import { Badge, Box, Button, Card, CardContent, ListItem, styled, Typography, type BadgeProps } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import styles from './ServiceComponent.module.css';
import type { Availability, Service } from "../../../../types/Shared/Service";
import { useCallback, useEffect, useState } from "react";
import { useServiceStore } from "../../../../store/useServiceStore";
import { getHourFormat, getWeekDayName } from "../../../../utils";
import { useNavigate } from "react-router-dom";

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

  const handleGetAvailability = useCallback( async () => {
    try {
      const result = await (getAvailability(service.id) as unknown) as Availability[];
      setAvailabilities(result);
    } catch (error) {
      console.error('Error fetching availability:', error);
      throw error;
    }
  }, [service.id, getAvailability]);

  const novigate = useNavigate();

  useEffect(() => {
    handleGetAvailability();
  }, [handleGetAvailability]);

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
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          <StyledBadge badgeContent={12} color="error">
            Gestionar agenda
          </StyledBadge>
        </Button>
        <Button
          onClick={() => novigate(`/create-service/${service.id}`)}
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