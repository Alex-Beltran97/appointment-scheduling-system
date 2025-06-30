import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { Calendar, dayjsLocalizer, type Event, type View } from 'react-big-calendar';

import dayjs from 'dayjs';
import 'dayjs/locale/es';

import localizedFormat from 'dayjs/plugin/localizedFormat';

import styles from './SchedulingPage.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useServiceStore } from '../../../store/useServiceStore';
import { useNotificationStore } from '../../../store/useNotificationStore';
import type { Slot } from '../../../types/Shared/Service';
import AppointmentModal from '../../../components/consultant/SchedulingPage/AppointmentModal/AppointmentModal';

dayjs.extend(localizedFormat);
dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);

const messages = {
  next: 'Sig.',
  previous: 'Ant.',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  work_week: 'Dias habiles',
  day: 'Día',
  agenda: 'Agenda',
  showMore: (total: number) => `+${total} más`,
};

const SchedulingPage = () => {
  const [view, setView] = useState<View | undefined>('month');
  const [date, setDate] = useState<Date>(new Date());
  const [selected, setSelected] = useState<Event | null>(null);

  const [events, setEvents] = useState<Event[]>([]);

  const {getAvailabilitySlots} = useServiceStore();
  const {showNotification} = useNotificationStore();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const handleGetAvailabilitySlots = useCallback(async (serviceId: string) => {
    try {
      const slots = await (getAvailabilitySlots(serviceId) as unknown) as Slot[];
      if (!slots || slots.length === 0) {
        showNotification('No hay horarios disponibles para este servicio.', 'info');
        return;
      };
      handleFormattedEvents(slots);
    } catch (error) {
      console.error('Error al obtener los horarios disponibles:', error);
      showNotification('No se pudieron obtener los horarios disponibles. Inténtalo más tarde.', 'error');
    };
  }, [getAvailabilitySlots, showNotification]);

  const handleFormattedEvents = (slots: Slot[]) => {
    const formattedEvents: Event[] = slots.map(slot => {
      const startTime = slot.start_time.split('-').shift();
      const endTime = slot.end_time.split('-').shift();
      return {
        id: slot.id,
        title: `Disponible`,
        start: new Date(`${slot.date}T${startTime}`),
        end: new Date(`${slot.date}T${endTime}`),
        allDay: false,
        desc: `Horario disponible para el servicio`,
      };
    });
    setEvents(formattedEvents);
  };

  useEffect(() => {
    const serviceId = searchParams.get('service-id');
        
    if (!serviceId) {
      showNotification('No se proporcionó un ID de servicio.', 'error');
      navigate(-1);
      return;
    };
    handleGetAvailabilitySlots(serviceId);
  }, [searchParams, handleGetAvailabilitySlots, navigate, showNotification]);

  return (<main className={styles.container}>    
    <IconButton onClick={() => navigate(-1)}>
      <ReplyOutlinedIcon />
    </IconButton>
    <Typography variant="h4" component="h1" gutterBottom>
      Fechas disponibles para el servicio
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />
    <Typography variant="h6" component="h2" textAlign='center' gutterBottom>
      Fechas disponibles
    </Typography>
    <Box>
      <Calendar
        localizer={localizer}
        components={{
          event: ({ event }) =>
            <CustomEvent event={event} view={view} onClick={() => {
              if (view === 'day') {
                setSelected(event);
              }
            }} />
        }}
        selectable
        onSelectSlot={(slotInfo) => {
          if (view === 'month') {
            setView('day');
            setDate(slotInfo.start);
          }
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
        views={['month', 'week', 'work_week', 'day', 'agenda']}
        defaultView='month'
        messages={messages}
        style={{ height: 500 }}        
      />
    </Box>

    {selected && (
      <AppointmentModal
        open
        onClose={() => setSelected(null)}
        selectedEvent={selected}
      />
    )}
  </main>);
};

interface CustomEventProps {
  event: Event;
  onClick?: () => void;
  view?: string;
}

function CustomEvent({event, onClick = () => {}}: CustomEventProps) {
  return (
    <Box onClick={onClick} sx={{ cursor: 'pointer', padding: '2px' }}>{event.title}</Box>
  );
}

export default SchedulingPage;