import { AppBar, Box, Button, Toolbar } from "@mui/material";

import styles from './NavBar.module.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path = '') => navigate(`/${path}`, { replace: true });

  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.container}>
          <Link to="/home">
            <img src="/img/logo.svg" alt="logo" />
          </Link>
          <Box>
            <Button
              color="inherit"
              onClick={() => handleNavigate('home')}
            >Inicio</Button>
            <Button
              color="inherit"
              onClick={() => handleNavigate('plans')}
            >Planes</Button>
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