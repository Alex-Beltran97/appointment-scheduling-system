import { Button, Divider, List, ListItem, Typography } from "@mui/material";

import styles from './ScheduleDetailPage.module.css';

const ScheduleDetailPage = () => {
  return (<main className={styles.container}>
    <Typography variant="h4" component='h1' textAlign='center' gutterBottom>
      Detalle del agendamiento
    </Typography>
    <Divider sx={{ marginBottom: '1rem' }} />
    <List>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='p'>
          Nombre del cliente:
        </Typography>
        <Typography variant="body1" component='p'>
          Laura Daniela Pérez Rincón
        </Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='p'>
          Servicio contratado:
        </Typography>
        <Typography variant="body1" component='p'>
          Servicio de ejemplo #1
        </Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='p'>
          Estado de consulta:
        </Typography>
        <Typography variant="body1" component='p'>
          Pendiente por tomar
        </Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='p'>
          Fecha de la sesión:
        </Typography>
        <Typography variant="body1" component='p'>
          24 de Junio de 2024
        </Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='p'>
          Modalidad:
        </Typography>
        <Typography variant="body1" component='p'>
          Presencial
        </Typography>
      </ListItem>
      <Button variant="contained" color="secondary" fullWidth>Reprogramar sesión</Button>
    </List>
  </main>);
};

export default ScheduleDetailPage;