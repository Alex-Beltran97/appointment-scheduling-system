import { AppBar, Box, Button, Toolbar } from "@mui/material";

import styles from './NavBar.module.css';

const NavBar = () => {
  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.container}>
          <Button color="inherit">Iniciar Sesion</Button>
          <Button color="inherit">Registrarse</Button>
        </Toolbar>
      </AppBar>
    </Box>
  </>);
};

export default NavBar;