import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { Home } from '@mui/icons-material';

import styles from './NavBar.module.css';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path = '') => navigate(`/${path}`, { replace: true });

  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.container}>
          <IconButton
            color="inherit"
            onClick={() => handleNavigate('home')}
          >
            <Home />
          </IconButton>
          <Box>
            <Button
              color="inherit"
              onClick={() => handleNavigate('login')}
            >Iniciar Sesion</Button>
            <Button
              color="inherit"
              onClick={() => handleNavigate('register')}
            >Registrarse</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  </>);
};

export default NavBar;