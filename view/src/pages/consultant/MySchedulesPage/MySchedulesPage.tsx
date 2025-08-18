import { Box, Divider, FormControl, IconButton, InputLabel, List, MenuItem, Select, Typography } from "@mui/material";

import styles from './MySchedulesPage.module.css';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { type Moment } from "moment";

import ScheduleComponent from "../../../components/consultant/MySchedule/ScheduleComponent/ScheduleComponent";
import { useAppointmentStore } from "../../../store/useAppointment";
import { useCallback, useEffect, useState, type SetStateAction } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNotificationStore } from "../../../store/useNotificationStore";

import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNotification } from "../../../store/useNotification";
import socket from "../../../service/socket";

type appointmentParams = {
  id_consultant?: string | number | undefined;
  id_status?: string | number | undefined;
  id_service?: string | number | undefined;
  date?: string | number | undefined;
};

const names = [
  'Pendientes',
  'Cancelados',
  'Finalizado',
];

const MySchedulesPage = () => {

  const {idUser} = useAuthStore();

  const {appointments, getAppointments} = useAppointmentStore();
  const {showNotification} = useNotificationStore();

  const handleGetAppointments = useCallback( async ({id_consultant, id_status, id_service, date}: appointmentParams) => {
      try {
        await getAppointments({id_consultant, id_status, id_service, date});
      } catch (error) {
        showNotification('No se pudieron obtener las citas. Inténtalo más tarde.', 'error');
        console.error('Error fetching appointments:', error);
      }
    }, [getAppointments, showNotification]);

  const [appointmentStatus, setAppointmentStatus] = useState(1);
  const [datePicked, setDatePicked] = useState<Moment>(moment());

  const handlePickDate = (date: Moment | null) => {
    const dateSearch = date?.format('YYYY-MM-DD') || '';
    handleGetAppointments({id_consultant: idUser, id_status: appointmentStatus, date: dateSearch});
    setDatePicked(date as SetStateAction<Moment>);
  };

  const [searchParams] = useSearchParams();

  const {notifications} = useNotification();

  useEffect(() => {
    const serviceId = searchParams.get('service-id');
    handleGetAppointments({id_consultant: idUser, id_status: appointmentStatus, id_service: serviceId ? Number(serviceId) : undefined});
    
    socket.on('new_notification', () => {
      handleGetAppointments({id_consultant: idUser, id_status: appointmentStatus, id_service: serviceId ? Number(serviceId) : undefined});
    });
    
    return () => {
      socket.off('new_notification', () => {
        handleGetAppointments({id_consultant: idUser, id_status: appointmentStatus, id_service: serviceId ? Number(serviceId) : undefined});
      });
    };
  }, [handleGetAppointments, idUser, appointmentStatus, searchParams, notifications]);

  const navigate = useNavigate();

  return (<main className={styles.container}>
    <IconButton onClick={() => navigate('/dashboard')}>
      <ReplyAllOutlinedIcon />
    </IconButton>
    <Typography variant="h4" component='h1' textAlign='center' gutterBottom>
      Mis Agendas
    </Typography>
    <Divider sx={{ marginBottom: '1rem' }} />
    <Box className={styles.nav__buttons}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          value={datePicked}
          onChange={(value) => handlePickDate(value as Moment)}
        />
      </LocalizationProvider>
      <FormControl>
        <InputLabel id="category-picker-label">Filtro</InputLabel>
        <Select
          labelId="category-picker-label"
          id="category-picker"
          value={appointmentStatus}
          label="Age"
          onChange={event => setAppointmentStatus(Number(event.target.value))}
        >
          {names.map((name, index) => (
            <MenuItem key={index} value={index+1}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <Typography variant="h6" component='h2' gutterBottom>
      Servicio:
    </Typography>
    <List>
      {appointments.length > 0 && appointments.map((appointment) => (
        <ScheduleComponent key={appointment.id} appointment={appointment} /> 
      ))}
    </List>
  </main>);
};

export default MySchedulesPage;