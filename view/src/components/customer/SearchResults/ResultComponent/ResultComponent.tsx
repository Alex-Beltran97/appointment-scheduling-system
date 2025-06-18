import { Box, Button, Card, CardContent, ListItem, Typography } from "@mui/material";

import styles from './ResultComponent.module.css';

const ResultComponent = () => {
  return (
    <ListItem>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Servicio de ejemplo #1
          </Typography>
          <Box className={styles.service__item}>
            <Typography variant="body2" component="p">
              Creado por:
            </Typography>
            <Typography variant="body2" component="p">
              Pepito Jaimito Perez Prieto - Abogado
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" component="p">
              Descripción:
            </Typography>
            <Typography variant="body2" component="p">
              Lorem ipsum dolor sit amet consectetur. In nec vitae semper ac. Nullam scelerisque odio vel ornare in eleifend felis. Arcu ornare aliquet vitae dictum non natoque amet egestas. Vitae molestie lorem pharetra sit nisl pharetra. Amet vitae amet libero ultrices mollis. Interdum porttitor congue augue eu. Phasellus leo maecenas massa varius enim habitant aliquam.
            </Typography>
          </Box>
          <Box className={styles.service__item}>
            <Typography variant="body2" component="p">
              Modalidad:
            </Typography>
            <Typography variant="body2" component="p">
              Presencial
            </Typography>
          </Box>
          <Box className={styles.service__item}>
            <Typography variant="body2" component="p">
              Tarifa:
            </Typography>
            <Typography variant="body2" component="p">
              $50.000 COP
            </Typography>
          </Box>
          <Box className={styles.service__item}>
            <Typography variant="body2" component="p">
              Tipo de duración:
            </Typography>
            <Typography variant="body2" component="p">
              Por sesión
            </Typography>
          </Box>
          <Typography variant="body1" component="h3" textAlign="center" gutterBottom>
            Horarios
          </Typography>
          <Box className={styles.service__item}>
            <Typography variant="body2" component="p">
              Lunes a viernes
            </Typography>
            <Typography variant="body2" component="p">
              De 8:00 a.m. a 05:00 p.m.
            </Typography>
          </Box>
          <Button variant="contained" color="secondary" fullWidth>Solicitar consulta</Button>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default ResultComponent;