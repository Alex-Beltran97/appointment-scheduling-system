import { Divider, Typography } from "@mui/material";

import styles from './ChangeAppointment.module.css';
import FormChangeAppointment from "../../../components/customer/ChangeAppointment/FormChangeAppointment/FormChangeAppointment";

const ChangeAppointment = () => {
  return (<main className={styles.container}>
    <Typography variant="h4" textAlign="center" component="h1" gutterBottom>
      Cambiar cita
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />
    <Typography variant="h6" component="p" gutterBottom>
      Debes ingresar el ID de la cita que deseas modificar. Posteriormente, selecciona la accion que quieres efectuar sobre la cita. Puedes elegir entre "Reprogramar" o "Cancelar".
    </Typography>
    <FormChangeAppointment />
  </main>);
};

export default ChangeAppointment;