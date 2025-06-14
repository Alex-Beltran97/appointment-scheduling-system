import { AppBar, Box, Toolbar, Typography } from '@mui/material';

// import styles from './FooterBar.module.css';

const FooterBar = () => {
  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant='body2' component='p' sx={{flexGrow:1}} align='center'>
            Desarrollador por: Monica Julieth Beltran Hernandez
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  </>);
};

export default FooterBar;