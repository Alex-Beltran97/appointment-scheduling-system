import { Badge, Box, Button, Card, CardContent, ListItem, styled, Typography, type BadgeProps } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import styles from './ServiceComponent.module.css';

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -16,
    top: 12,
  },
}));

const ServiceComponent = () => {
  return (<ListItem>
    <Card>
      <CardContent>
        <Typography variant="h6" component="h4" textAlign='center' gutterBottom>
          Servicio de ejemplo #1
        </Typography>
        <Typography variant="body1" component="h6" gutterBottom>
          Descripcion
        </Typography>
        <Typography variant="body2" component="h6" gutterBottom>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat molestias officiis iste consequatur velit quidem repellendus cum error blanditiis. Debitis, distinctio sed, tempore sunt dolore nesciunt quibusdam similique laborum facilis error quasi sequi et omnis hic. Voluptas aliquid mollitia nulla quasi dicta rem error excepturi quo sunt facere. Nam dolor qui dignissimos magni cum veritatis blanditiis officia! Laudantium suscipit eius error ducimus, libero, ad vitae debitis dicta qui, placeat praesentium soluta enim rerum ullam quo dolores cum. Dignissimos, quas ipsam.
        </Typography>
        <Box className={styles.schedule__item}>
          <Typography variant="body2" component="h6">
            Estado
          </Typography>
          <Typography variant="body2" component="h6">
            Activo
          </Typography>
        </Box>
        <Box className={styles.schedule__item}>
          <Typography variant="body2" component="h6">
            Modalidad
          </Typography>
          <Typography variant="body2" component="h6">
            Presencial
          </Typography>
        </Box>
        <Box className={styles.schedule__item}>
          <Typography variant="body2" component="h6">
            Tarifa
          </Typography>
          <Typography variant="body2" component="h6">
            $50.000 COP
          </Typography>
        </Box>
        <Box className={styles.schedule__item}>
          <Typography variant="body2" component="h6">
            Tipo de duración
          </Typography>
          <Typography variant="body2" component="h6">
            Por sesión
          </Typography>
        </Box>
        <Typography variant="body1" component="h6" textAlign='center' gutterBottom>
          Horarios
        </Typography>
        <Box className={styles.schedule__item}>
          <Typography variant="body2" component="h6">
            Lunes a viernes
          </Typography>
          <Typography variant="body2" component="h6">
            De 8:00 a.m. a 05:00 p.m.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          <StyledBadge badgeContent={12} color="error">
            Gestionar agenda
          </StyledBadge>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth sx={{
            marginTop: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          Administrar servicio
          <BorderColorIcon sx={{width: '1rem'}} />
        </Button>
      </CardContent>
    </Card>
  </ListItem>);
};

export default ServiceComponent;