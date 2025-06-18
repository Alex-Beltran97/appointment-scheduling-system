import { Box, Button, Divider, FormControl, InputLabel, List, MenuItem, Select, Typography } from "@mui/material";

import styles from './MySchedulesPage.module.css';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ScheduleComponent from "../../../components/consultant/MySchedule/ScheduleComponent/ScheduleComponent";

const MySchedulesPage = () => {
  return (<main className={styles.container}>
    <Typography variant="h4" component='h1' textAlign='center' gutterBottom>
      Mis Agendas
    </Typography>
    <Divider sx={{ marginBottom: '1rem' }} />
    <Box className={styles.nav__buttons}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          name="birthDate"        
          value={moment()}
          // onChange={(value) => setFieldValue('birthDate', value)}
          // slotProps={{
          //   textField: {
          //     name: 'birthDate',
          //     error: touched.birthDate && Boolean(errors.birthDate),
          //     helperText: touched.birthDate && typeof errors.birthDate === 'string' ? errors.birthDate : '',
          //     onBlur: handleBlur,
          //   },
          // }}
        />
      </LocalizationProvider>
      <Box>
        <Button variant="outlined" startIcon={<ChevronLeftIcon />} />
        <Button variant="outlined" startIcon={<ChevronRightIcon />} />
      </Box>
    </Box>
    <Box className={styles.nav__buttons}>
      <Typography variant="h6" component='h2' gutterBottom>
        Servicio:
      </Typography>
      <FormControl>
        <InputLabel id="category-picker-label">Filtro</InputLabel>
        <Select
          labelId="category-picker-label"
          id="category-picker"
          value="all"
          label="Age"
          onChange={() => {}}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="newest">Mas recientes</MenuItem>
          <MenuItem value="oldest">Mas antiguos</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <List>
      <ScheduleComponent />
      <ScheduleComponent />
      <ScheduleComponent />
      <ScheduleComponent />
    </List>
  </main>);
};

export default MySchedulesPage;