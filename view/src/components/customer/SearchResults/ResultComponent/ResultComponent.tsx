import { Box, Button, Card, CardContent, ListItem, Typography } from "@mui/material";

import styles from './ResultComponent.module.css';
import type { Service } from "../../../../types/Shared/Service";
import { getHourFormat, getWeekDayName } from "../../../../utils";
import { useNavigate } from "react-router-dom";

interface Props {
  service: Service;
};

const ResultComponent = ({service}: Props) => {

  const navigate = useNavigate();

  return (
    <ListItem>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {service.name}
          </Typography>
          <Box className={styles.service__item}>
            <Typography variant="body2" component="p">
              Creado por:
            </Typography>
            <Typography variant="body2" component="p">
              {service.consultant.name} {service.consultant.lastName}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" component="p">
              Descripción:
            </Typography>
            <Typography variant="body2" component="p">
              {service.description}
            </Typography>
          </Box>
          <Box className={styles.service__item}>
            <Typography variant="body2" component="p">
              Tarifa:
            </Typography>
            <Typography variant="body2" component="p">
              ${service.price} COP
            </Typography>
          </Box>
          <Box className={styles.service__item}>
            <Typography variant="body2" component="p">
              Duración:
            </Typography>
            <Typography variant="body2" component="p">
              {service.durationMinutes} minutos
            </Typography>
          </Box>
          <Typography variant="body1" component="h3" textAlign="center" gutterBottom>
            Horarios
          </Typography>
          { service.consultantAvailabilities && service.consultantAvailabilities.length > 0 ?
            service.consultantAvailabilities.map((schedule) => (
              <Box key={schedule.id} className={styles.service__item}>
                <Typography variant="body2" component="p">
                  {getWeekDayName(schedule.weekday)}
                </Typography>
                <Typography variant="body2" component="p">
                  {getHourFormat(schedule.start_time)} - {getHourFormat(schedule.end_time)}
                </Typography>
              </Box>
            )) :
            <Typography variant="body2" component="p">
              No hay horarios disponibles
            </Typography>
          }
          <Button
            onClick={() => navigate(`/scheduling?service-id=${service.id}`)}
            variant="contained"
            color="secondary"
            fullWidth
          >Solicitar consulta</Button>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default ResultComponent;