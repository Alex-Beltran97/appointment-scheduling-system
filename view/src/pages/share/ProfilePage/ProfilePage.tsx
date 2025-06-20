import { Box, Divider, Paper, Typography } from "@mui/material";

import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  return (<main className={styles.container}>
    <Typography variant="h4" textAlign='center' component="h1" gutterBottom>
      Profile Page
    </Typography>
    <Divider />
    <Box className={styles.profile}>
      <Paper className={styles.photo} elevation={3}>
        <img src="https://www.shutterstock.com/image-illustration/porto-portugal-11072023-yellowhead-lego-260nw-2330445597.jpg" alt="photo" />
      </Paper>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Nombres:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          Pepito Juanito
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Primer apellido:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          Perez
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Segundo apellido:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          Prieto
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Fecha de nacimiento:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          10/10/1997
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Telefono:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          +57 313 555 44 44
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Ciudad:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          Bogota D.C.
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Correo electronico:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          pepito.perez@example.com
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Contraseña:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          **************
        </Typography>
      </Box>
    </Box>
  </main>);
};

export default ProfilePage;