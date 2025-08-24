import { Box, Divider, Paper, Typography } from "@mui/material";

import styles from './ProfilePage.module.css';
import { useProfileStore } from "../../../store/useProfileStore";
import { useCallback, useEffect, useState } from "react";
import { useNotificationStore } from "../../../store/useNotificationStore";
import { useAuthStore } from "../../../store/useAuthStore";
import type { Profile } from "../../../types/auth/Register";
import moment from "moment";

const ProfilePage = () => {
  const {idUser} = useAuthStore();
  const {profile, getProfile, getProfileImg} = useProfileStore();

  const {showNotification} = useNotificationStore();

  const [img, setImg] = useState('');

  const handleGetProfileImg = useCallback(async (id: number) => {
    try {
      const imgUrl = await getProfileImg({id});
      setImg(imgUrl);
    } catch (error) {
      showNotification('Error fetching profile image','error');
      console.error('Error fetching profile image:', error);
    }
  }, [getProfileImg, showNotification]);

  const handleGetProfileData = useCallback(async () => {
    try {
      const result = await getProfile({id: idUser}) as unknown as Profile;
      handleGetProfileImg(result?.photo?.id || 0);
    } catch (error) {
      showNotification('Error fetching profile data', 'error');
      console.error('Error fetching profile data:', error);
    }
  }, [getProfile, idUser, showNotification, handleGetProfileImg]); 
  
  useEffect(() => {
    handleGetProfileData();    
  }, [handleGetProfileData]);

  return (<main className={styles.container}>
    <Typography variant="h4" textAlign='center' component="h1" gutterBottom>
      Profile Page
    </Typography>
    <Divider />
    <Box className={styles.profile}>
      <Paper className={styles.photo} elevation={3}>
        {img && <img loading="lazy" src={img} alt="Profile" />}
      </Paper>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Nombres:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          {profile?.name}
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Primer apellido:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          {profile?.lastName}
        </Typography>
      </Box>
      {profile?.secondLastName && (
        <Box className={styles.profile__item}>
          <Typography variant="body1" component="h4" gutterBottom>
            Segundo apellido:
          </Typography>
          <Typography variant="body1" component="h4" gutterBottom>
            {profile?.secondLastName}
          </Typography>
        </Box>
      )}
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Fecha de nacimiento:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          {moment(profile?.birthDate).format('DD/MM/YYYY')}
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Telefono:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          {profile?.phone || 'No disponible'}
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Ciudad:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          {profile?.cityCode || 'No disponible'}
        </Typography>
      </Box>
      <Box className={styles.profile__item}>
        <Typography variant="body1" component="h4" gutterBottom>
          Correo electronico:
        </Typography>
        <Typography variant="body1" component="h4" gutterBottom>
          {profile?.email || 'No disponible'}
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