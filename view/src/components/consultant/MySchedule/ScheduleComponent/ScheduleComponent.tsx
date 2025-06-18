import { Box, Divider, IconButton, ListItem, Typography } from "@mui/material";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';

import styles from './ScheduleComponent.module.css';

const ScheduleComponent = () => {
  return (
    <ListItem sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
      <Box className={styles.schedule__item}>
        <Typography variant="body1" component='p'>
          Laura Daniela Pérez Rincón
        </Typography>
        <Typography variant="body1" component='p'>
          08:00 a.m.
        </Typography>
      </Box>
      <Box className={styles.schedule__item}>
        <Box>
          <IconButton>
            <AccessTimeIcon color="primary" />
          </IconButton>
          <IconButton>
            <CloseIcon color="error" />
          </IconButton>
        </Box>
        <Typography variant="body1" component='p'>
          Servicio de ejemplo #1
        </Typography>
      </Box>
      <Divider sx={{ margin: '1rem 0' }} />
    </ListItem>
  );
};

export default ScheduleComponent;