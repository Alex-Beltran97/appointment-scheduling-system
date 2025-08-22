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

export const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalizePhrase = (phrase: string): string => {
  return phrase
    .split(' ')
    .map(p => capitalize(p))
    .join(' ');
};

export enum MONTHS {
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
};
