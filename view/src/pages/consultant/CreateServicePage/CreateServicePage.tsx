import { Divider, Typography } from '@mui/material';
import styles from './CreateServicePage.module.css';
import ServiceForm from '../../../components/shared/ServiceForm/ServiceForm';
import { useParams } from 'react-router-dom';

const CreateServicePage = () => {
  const { id } = useParams<{ id: string }>();

  return (<main className={styles.container}>
    <Typography variant="h4" component="h1" textAlign='center' gutterBottom>
      {id ? "Editar" : "Crear nuevo"} servicio
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />
    <ServiceForm serviceId={id} />
  </main>);
};

export default CreateServicePage;