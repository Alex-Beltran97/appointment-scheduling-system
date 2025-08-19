import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    month: 'Enero',
    pendientes: 10,
    completadas: 10,
    canceladas: 10,
  },
  {
    month: 'Febrero',
    pendientes: 20,
    completadas: 20,
    canceladas: 20,
  },
  {
    month: 'Marzo',
    pendientes: 30,
    completadas: 30,
    canceladas: 30,
  },
  {
    month: 'Abril',
    pendientes: 40,
    completadas: 40,
    canceladas: 40,
  },
  {
    month: 'Mayo',
    pendientes: 50,
    completadas: 50,
    canceladas: 50,
  },
  {
    month: 'Junio',
    pendientes: 60,
    completadas: 60,
    canceladas: 60,
  },
  {
    month: 'Julio',
    pendientes: 70,
    completadas: 70,
    canceladas: 70,
  },
  {
    month: 'Agosto',
    pendientes: 80,
    completadas: 80,
    canceladas: 80,
  },
  {
    month: 'Septiembre',
    pendientes: 90,
    completadas: 90,
    canceladas: 90,
  },
  {
    month: 'Octubre',
    pendientes: 100,
    completadas: 100,
    canceladas: 100,
  },
  {
    month: 'Noviembre',
    pendientes: 90,
    completadas: 90,
    canceladas: 90,
  },
  {
    month: 'Diciembre',
    pendientes: 80,
    completadas: 80,
    canceladas: 80,
  }
];

const SchedulesTab = () => {
  return (<>
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