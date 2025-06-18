import { Button, Divider, Grid, List, Typography } from "@mui/material";

import styles from './DashboardPage.module.css';
import ScheduleComponent from "../../../components/consultant/Dashboard/ScheduleComponent/ScheduleComponent";

const DashboardPage = () => {
  return (<main className={styles.container}>
    <Typography variant="h4" component="h1" textAlign='center' gutterBottom>
      Mis servicios
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />
    <Button variant="contained" color="secondary" fullWidth sx={{ marginBottom: 2 }}>
      Crear nuevo servicio
    </Button>
    <Divider sx={{ marginBottom: 2 }} />
    <Typography variant="h5" component="h2" textAlign='center' gutterBottom>
      Lista de servicios
    </Typography>
    <List>
      <Grid container spacing={2}>
        <Grid size={6}>
          <ScheduleComponent />
        </Grid>
        <Grid size={6}>
          <ScheduleComponent />
        </Grid>
        <Grid size={6}>
          <ScheduleComponent />
        </Grid>
      </Grid>
    </List>
  </main>);
};

export default DashboardPage;