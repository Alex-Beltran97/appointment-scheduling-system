import { Box, Button, Card, CardContent, Divider, IconButton, List, ListItem, Typography } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

import styles from './MyCustomerSchedules.module.css';
import CustomerScheduleComponent from "../../../components/customer/MyCustomerSchedules/CustomerScheduleComponent/CustomerScheduleComponent";

const MyCustomerSchedules = () => {
  return (<main>
    <IconButton>
      <SearchIcon sx={{fontSize: '2.5rem'}} />
    </IconButton>
    <Typography variant="h4" component="h1" textAlign='center' gutterBottom>
      Mis agendas
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />
    <List>
      <CustomerScheduleComponent />
      <CustomerScheduleComponent />
      <CustomerScheduleComponent />
    </List>
  </main>);
};

export default MyCustomerSchedules;