import { AppBar, Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";

import styles from './ConsultantNavBar.module.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import NotificationComponent from "../NotificationComponent/NotificationComponent";
import { useProfileStore } from "../../../store/useProfileStore";
import { useNotificationStore } from "../../../store/useNotificationStore";
import type { Profile } from "../../../types/auth/Register";

const ConsultantNavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path = '') => navigate(`/${path}`, { replace: true });  

  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.container}>
          <Link to="/home">
            <img src="/img/logo.svg" alt="logo" />
          </Link>
          <Box className={styles.navbar}>
            <NotificationComponent />            
            <Button
              color="inherit"
              onClick={() => handleNavigate('dashboard')}
            >Mis servicios</Button>
            <Button
              color="inherit"
              onClick={() => handleNavigate('my-schedules')}
            >Mis agendas</Button>
            <AvatarButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  </>);
};


const AvatarButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleNavigate = (path = '') => navigate(`/${path}`);

  const handleLogout = useAuthStore(state => state.logout);

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
      const _profile = await getProfile({id: idUser}) as unknown as Profile;
      handleGetProfileImg(_profile?.photo?.id || 0);
      showNotification('Perfil cargado correctamente', 'success');
    } catch (error) {
      showNotification('Error al cargar el perfil', 'error');
      console.error('Error fetching profile data:', error);
    }
  }, [getProfile, idUser, showNotification, handleGetProfileImg]);

  useEffect(() => {
    if (idUser) {
      handleGetProfileData();
    } else {
      showNotification('Usuario no encontrado', 'error');
    }
  }, [idUser, handleGetProfileData, showNotification]);

  const truncateName = () => {
    const _name = profile?.name.slice(0, 1) || '';
    const _lastname = profile?.lastName.slice(0, 1) || '';
    return `${_name}${_lastname}`.toUpperCase();
  };  

  return (<>
    <IconButton onClick={handleClick}>
      <Avatar
        alt={`${profile?.name} ${profile?.lastName}`}
        src={img}
        sx={{ width: 40, height: 40, backgroundColor: '#6A96AD' }}
      >{truncateName()}</Avatar>
    </IconButton>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleNavigate('profile')}>Perfil</MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Cerrar Session</MenuItem>
    </Menu>
  </>
  );
};

export default ConsultantNavBar;