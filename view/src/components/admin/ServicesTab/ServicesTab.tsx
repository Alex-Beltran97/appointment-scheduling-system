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
  }
];

const ServicesTab = () => {
  return (<>
    <h1>ServicesTab</h1>
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