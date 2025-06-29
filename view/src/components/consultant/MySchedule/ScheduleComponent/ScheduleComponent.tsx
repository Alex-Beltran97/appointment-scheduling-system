import { Divider, Grid, IconButton, ListItem, Tooltip, Typography } from "@mui/material";

import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';

import styles from './ScheduleComponent.module.css';
import type { Appointment } from "../../../../types/Shared/Service";
import { getHourFormat } from "../../../../utils";
import { useAppointmentStore } from "../../../../store/useAppointment";
import { useNotificationStore } from "../../../../store/useNotificationStore";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface Props {
  appointment: Appointment;
};

const ScheduleComponent = ({appointment}: Props) => {

  const {deleteAppointment, completeAppointmentById} = useAppointmentStore();
  const {showNotification} = useNotificationStore();

  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointment(appointment.id);
      console.log('Appointment deleted successfully');
      showNotification('Appointment deleted successfully', 'success');
    } catch (error) {
      showNotification('Error deleting appointment', 'error');
      console.error('Error deleting appointment:', error);
    };
  };

  const handleCompleteAppointment = async () => {
    try {
      await completeAppointmentById(appointment.id);
      console.log('Appointment completed successfully');
      showNotification('Appointment completed successfully', 'success');
    } catch (error) {
      showNotification('Error completing appointment', 'error');
      console.error('Error completing appointment:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <ListItem sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
      <Grid container spacing={12} rowGap={1}>
        <Grid size={9}>
          <Typography variant="body1" component='p'>
            {appointment.clientFullName}
          </Typography>
        </Grid>
        <Grid size={3} className={styles.schedule__item}>
          <Typography variant="body1" component='p'>
            {appointment.service?.name}
          </Typography>
        </Grid>
        <Grid size={9}>
          <Typography variant="body1" component='p'>
            Fecha: {moment(appointment.date).format('LL')}
          </Typography>
        </Grid>
        <Grid size={3} className={styles.schedule__item}>
          <Typography variant="body1" component='p'>
            {getHourFormat(appointment.start_time)} - {getHourFormat(appointment.end_time)}
          </Typography>
        </Grid>
        <Grid size={9} className={styles.schedule__item} sx={{ justifyContent: 'flex-start' }}>
          <Typography variant="body1" component='p'>
            Estado:
          </Typography>
          <Typography variant="body1" component='p'>
          {appointment?.status?.status}
          </Typography>
        </Grid>
        {appointment?.status?.id === 1 && (
          <Grid size={3} className={styles.schedule__item}>
            <Tooltip title="Confirmar/Despachar Cita">
              <IconButton onClick={handleCompleteAppointment}>
                <CheckIcon color="secondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reprogramar Cita">
              <IconButton onClick={() => navigate(`/consultant-scheduling?service-id=${appointment.service?.id}&appointment-id=${appointment.id}`)}>
                <AccessTimeIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar Cita">
              <IconButton onClick={handleDeleteAppointment}>
                <CloseIcon color="error" />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      </Grid>
      <Divider sx={{ margin: '1rem 0' }} />
    </ListItem>
  );
};

export default ScheduleComponent;