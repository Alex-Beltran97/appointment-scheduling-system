import { useState, type SetStateAction } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { useAppointmentsFetcher } from './hooks/useAppointmentsFetcher';
import { useMonthlyReports } from './hooks/useMonthlyReports';
import type { Moment } from 'moment';
import moment from 'moment';

const SchedulesTab = () => {
  const [value, setValue] = useState<Moment>(moment());
  
  const {appointments} = useAppointmentsFetcher(value.get("year"));
  
  const {data} = useMonthlyReports(appointments); 

  return (<>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        views={['year']}
        openTo="year"
        label="Año"
        value={value}
        onChange={(newValue) => setValue(newValue as SetStateAction<Moment>)}
        slotProps={{ textField: { variant: 'outlined' } }}
      />
    </LocalizationProvider>
    <BarChart
      width={1000}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 10,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pendientes" fill="#6969f4" activeBar={<Rectangle fill="#a8a8ea" stroke="blue" />} />
      <Bar dataKey="completadas" fill="#07ef39" activeBar={<Rectangle fill="#07ef39" stroke="lightgreen" />} />
      <Bar dataKey="canceladas" fill="#ff3f72" activeBar={<Rectangle fill="#f2b0c2" stroke="red" />} />
    </BarChart>
  </>);
};

export default SchedulesTab;