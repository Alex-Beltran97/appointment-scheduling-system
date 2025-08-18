import moment from "moment";

export const getWeekDayName = (day: number): string => {
  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];
  return days[day] || '';
};

export const getHourFormat = (hour: string) => {
  return moment(hour, "HH:mm:ssZ").format('hh:mm a');
};