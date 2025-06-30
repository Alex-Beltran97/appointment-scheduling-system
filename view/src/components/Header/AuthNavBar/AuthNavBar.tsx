import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";

import styles from './AuthNavBar.module.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const AuthNavBar = () => {
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
            <IconButton color="inherit">
              <SearchIcon
                className={styles.searchIcon}
                onClick={() => handleNavigate('search')}
              />
            </IconButton>
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
            <Button
              color="inherit"
              onClick={() => handleNavigate('change-appointement')}
            >Modificar citas</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  </>);
};

export default AuthNavBar;