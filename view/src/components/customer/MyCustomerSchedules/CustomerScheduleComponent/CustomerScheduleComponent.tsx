import { Box, Button, Card, CardContent, ListItem, Typography } from "@mui/material";

import styles from './CustomerScheduleComponent.module.css';

const CustomerScheduleComponent = () => {
  return (<ListItem>
    <Card>
      <CardContent className={styles.schedule__item}>
        <Typography variant="h5" component="h3">
          Servicio de ejemplo #1
        </Typography>
        <Box className={styles.schedule__item__info}>
          <Typography variant="body2" color="text.secondary">
            Creado por:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pepito Jaimito Perez Prieto - Abogado
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Descripción
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Lorem ipsum dolor sit amet consectetur. In nec vitae semper ac. Nullam scelerisque odio vel ornare in eleifend felis. Arcu ornare aliquet vitae dictum non natoque amet egestas. Vitae molestie lorem pharetra sit nisl pharetra. Amet vitae amet libero ultrices mollis. Interdum porttitor congue augue eu. Phasellus leo maecenas massa varius enim habitant aliquam.
          </Typography>
        </Box>
        <Box className={styles.schedule__item__info}>
          <Typography variant="body2" color="text.secondary">
            Modalidad
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Presencial
          </Typography>
        </Box>
        <Box className={styles.schedule__item__info}>
          <Typography variant="body2" color="text.secondary">
            Fecha programada:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            8:00 a.m. - 28 de Junio de 2025
          </Typography>
        </Box>
        <Button variant="contained" color="secondary" fullWidth>Reprogramar consulta</Button>
        <Button variant="contained" color="error" fullWidth>Cancelar consulta</Button>
      </CardContent>
    </Card>
  </ListItem>);
};

export default CustomerScheduleComponent;