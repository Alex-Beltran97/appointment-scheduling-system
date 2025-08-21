import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState, type SetStateAction } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    service: 'Enero',
    agendas: 10,
  },
  {
    service: 'Febrero',
    agendas: 20,
  },
  {
    service: 'Marzo',
    agendas: 30,
  },
  {
    service: 'Abril',
    agendas: 40,
  },
  {
    service: 'Mayo',
    agendas: 50,
  },
  {
    service: 'Junio',
    agendas: 60,
  },
  {
    service: 'Julio',
    agendas: 70,
  },
  {
    service: 'Agosto',
    agendas: 80,
  },
  {
    service: 'Septiembre',
    agendas: 0,
  },
  {
    service: 'Octubre',
    agendas: 0,
  },
  {
    service: 'Noviembre',
    agendas: 0,
  },
  {
    service: 'Diciembre',
    agendas: 0,
  },
];

const ServicesTab = () => {
  const [value, setValue] = useState<Moment>(moment());

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
      <XAxis dataKey="service" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="agendas" fill="#6969f4" activeBar={<Rectangle fill="#a8a8ea" stroke="blue" />} />
    </BarChart>
  </>);
};

export default ServicesTab;