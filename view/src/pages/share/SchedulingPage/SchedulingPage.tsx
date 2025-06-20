import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import { useState } from 'react';

import { Calendar, dayjsLocalizer, type Event, type View } from 'react-big-calendar';

import dayjs from 'dayjs';
import 'dayjs/locale/es';

import localizedFormat from 'dayjs/plugin/localizedFormat';

import styles from './SchedulingPage.module.css';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SchedulingPage = () => {
  const [view, setView] = useState<View | undefined>('day');
  const [date, setDate] = useState<Date>(new Date());
  const [selected, setSelected] = useState<Event | null>(null);

  return (<main className={styles.container}>
    
    <IconButton>
      <ReplyOutlinedIcon />
    </IconButton>
    <Typography variant="h4" component="h1" gutterBottom>
      Servicio de ejemplo #1
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
            <CustomEvent event={event} onClick={() => setSelected(event)}/>
        }}
        events={[
          {
            id: 1,
            title: 'Evento 1',
            start: new Date("2025-06-19T10:00:00Z"),
            end: new Date("2025-06-19T11:30:00Z"),
            allDay: false
          },
          {
            id: 2,
            title: 'Evento 2',
            start: new Date("2025-06-20T10:00:00Z"),
            end: new Date("2025-06-20T11:30:00Z"),
            allDay: false,
            desc: "Reunión con equipo de desarrollo",
            tooltip: "Inicio a las 10:00, llevar reporte",
          },
        ]}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
        views={['month', 'week', 'work_week', 'day', 'agenda']}
        defaultView='agenda'
        messages={messages}
        style={{ height: 500 }}        
      />
    </Box>

    {selected && (
      <Modal
        open
        onClose={() => setSelected(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selected.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selected.start!.toLocaleString()} – {selected.end!.toLocaleString()}
          </Typography>
        </Box>
      </Modal>
    )}
  </main>);
};

interface CustomEventProps {
  event: Event;
  onClick?: () => void;
}

function CustomEvent({event, onClick = () => {}}: CustomEventProps) {
  return (
    <Box onClick={onClick} sx={{ cursor: 'pointer', padding: '2px' }}>{event.title}</Box>
  );
}

export default SchedulingPage;