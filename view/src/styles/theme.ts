// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6AADA3',
      light: '#8ccdc7',
      dark: '#4a7f7a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#6A96AD',
      light: '#8cb3c7',
      dark: '#4a6f7a',
      contrastText: '#fff',
    },
    error: {
      main: '#F36E8B',
      light: '#f99fb2',
      dark: '#b44f6a', 
      contrastText: '#fff',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
  },
});
export default theme;
