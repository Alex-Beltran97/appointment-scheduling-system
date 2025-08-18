import { Box, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import styles from './ServiceDetailPage.module.css';

import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const ServiceDetailPage = () => {
  return (<main className={styles.container}>
    <Typography variant="h4" component='h1' textAlign='center' gutterBottom>
      Detalle del servicio
    </Typography>
    <Divider sx={{ marginBottom: '1rem' }} />
    <Box className={styles.options__container}>
      <IconButton aria-label="Return Page">
        <ReplyOutlinedIcon sx={{fontSize: "2rem"}} />
      </IconButton>
      <Box>
        <IconButton aria-label="Return Page">
          <BorderColorOutlinedIcon sx={{fontSize: "2rem"}} />
        </IconButton>
        <IconButton aria-label="Return Page">
          <DeleteIcon color='error' sx={{fontSize: "2rem"}} />
        </IconButton>
      </Box>
    </Box>
    <List>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component='p'>
          Titulo:
        </Typography>
        <Typography variant="h6" component='p'>
          Servicio de ejemplo #1
        </Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="body1" component='h6' gutterBottom>
          Descripcion:
        </Typography>
        <Typography variant="body2" component='p' gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod fugiat sint repellendus tempora reiciendis doloribus nemo quibusdam recusandae sit, cupiditate quia dignissimos error consequatur quam quos! Error odio dolorem modi labore adipisci est, nisi explicabo expedita maxime vitae similique fugit beatae cum harum in magni laudantium, ipsam molestias ullam! Vero sed similique quae atque commodi optio veritatis facilis tenetur, laborum distinctio impedit, rem eum aut. Blanditiis vitae eum qui laboriosam deleniti. Accusantium sit velit assumenda tenetur maxime labore saepe impedit.
        </Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='h6' gutterBottom>
          Estado:
        </Typography>
        <Typography variant="body1" component='p' gutterBottom>
          Activo
        </Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='h6' gutterBottom>
          Modalidad:
        </Typography>
        <Typography variant="body1" component='p' gutterBottom>
          Presencial
        </Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='h6' gutterBottom>
          Tarifa:
        </Typography>
        <Typography variant="body1" component='p' gutterBottom>
          $50.000 COP
        </Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='h6' gutterBottom>
          Tipo de duración:
        </Typography>
        <Typography variant="body1" component='p' gutterBottom>
          Por sesión
        </Typography>
      </ListItem>
      <Typography variant="h6" component='h3' textAlign='center' gutterBottom>
        Horarios
      </Typography>
      <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" component='h6' gutterBottom>
          Lunes a viernes:
        </Typography>
        <Typography variant="body1" component='p' gutterBottom>
          De 8:00 a.m. a 05:00 p.m.
        </Typography>
      </ListItem>
    </List>
  </main>);
};

export default ServiceDetailPage;