import { Divider, Typography } from "@mui/material";
import FormComponent from "../../../components/auth/SuscribePlan/FormComponent/FormComponent";

import styles from './SuscribePlanPage.module.css';

const SuscribePlanPage = () => {
  return (<main className={styles.container}>
    <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
      Suscripcion a plan mensual
    </Typography>
    <Divider sx={{marginBottom: '1rem'}} />
    <FormComponent />
  </main>);
};

export default SuscribePlanPage;