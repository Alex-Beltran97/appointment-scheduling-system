import { AppBar, Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";

import styles from './ConsultantNavBar.module.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

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

  return (<>
    <IconButton onClick={handleClick}>
      <Avatar alt="Pepito Jaimito Perez Prieto" src="https://www.shutterstock.com/image-illustration/porto-portugal-11072023-yellowhead-lego-260nw-2330445597.jpg" />
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