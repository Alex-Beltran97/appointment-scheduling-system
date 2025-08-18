import { Button, Divider, Typography } from "@mui/material";

import styles from './DashboardPage.module.css';
import ScheduleContainer from "../../../components/consultant/Dashboard/ScheduleContainer/ScheduleContainer";
import { useNavigate } from "react-router-dom";

const UserDashboardPage = () => {
  const navigate = useNavigate();

  return (<main className={styles.container}>
    <Typography variant="h4" component="h1" textAlign='center' gutterBottom>
      Mis servicios
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      sx={{ marginBottom: 2 }}
      onClick={() => navigate('/create-service')}
    >
      Crear nuevo servicio
    </Button>
    <Divider sx={{ marginBottom: 2 }} />
    <Typography variant="h5" component="h2" textAlign='center' gutterBottom>
      Lista de servicios
    </Typography>
    <ScheduleContainer />
  </main>);
};

export default UserDashboardPage;