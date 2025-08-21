import { useEffect, useState } from "react";
import type { Appointment } from "../../../../types/Shared/Service";
import { capitalizePhrase, MONTHS } from "../../../../utils";
import moment from 'moment';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';

moment.locale('es');
dayjs.extend(localeData);
dayjs.locale('es');


interface IMonthReport {
  month: string | MONTHS,
  pendientes: number,
  completadas: number,
  canceladas: number,
};

export const useMonthlyReports = (appointments: Appointment[]) => {
  const [data, setData] = useState<IMonthReport[]>([]);

  const [januaryAppointments, setJanuaryAppointments] = useState<IMonthReport>();
  const [februaryAppointments, setFebruaryAppointments] = useState<IMonthReport>();
  const [marchAppointments, setMarchAppointments] = useState<IMonthReport>();
  const [aprilAppointments, setAprilAppointments] = useState<IMonthReport>();
  const [mayAppointments, setMayAppointments] = useState<IMonthReport>();
  const [juneAppointments, setJuneAppointments] = useState<IMonthReport>();
  const [julyAppointments, setJulyAppointments] = useState<IMonthReport>();
  const [augustAppointments, setAugustAppointments] = useState<IMonthReport>();
  const [septemberAppointments, setSeptemberAppointments] = useState<IMonthReport>();
  const [octoberAppointments, setOctoberAppointments] = useState<IMonthReport>();
  const [novemberAppointments, setNovemberAppointments] = useState<IMonthReport>();
  const [decemberAppointments, setDecemberAppointments] = useState<IMonthReport>();

  const getAppointmentsByMonth = (appointments: Appointment[]) => {
    const monthHooks = [
      setJanuaryAppointments,
      setFebruaryAppointments,
      setMarchAppointments,
      setAprilAppointments,
      setMayAppointments,
      setJuneAppointments,
      setJulyAppointments,
      setAugustAppointments,
      setSeptemberAppointments,
      setOctoberAppointments,
      setNovemberAppointments,
      setDecemberAppointments,
    ];

    for (const monthIndex in MONTHS) {
      const _filteredAppointments = appointments?.filter((appointment: Appointment) => {
        const monthId = moment(appointment?.date).get('M');
        const monthName = dayjs().month(monthId).format('MMMM');
        return capitalizePhrase(monthName) === MONTHS[monthIndex];
      });
      const pendingAppointments = _filteredAppointments.filter((appointment: Appointment) => appointment.status?.id === 1);
      const completedAppointments = _filteredAppointments.filter((appointment: Appointment) => appointment.status?.id === 3);
      const canceledAppointments = _filteredAppointments.filter((appointment: Appointment) => appointment.status?.id === 2);

      if (monthHooks[monthIndex]) {
        monthHooks[monthIndex]({
          month: MONTHS[monthIndex],
          pendientes: pendingAppointments?.length,
          completadas: completedAppointments?.length,
          canceladas: canceledAppointments?.length,
        });
      };
    };

  };

  useEffect(() => {
    setData([
      januaryAppointments!, februaryAppointments!, marchAppointments!, aprilAppointments!,
      mayAppointments!, juneAppointments!, julyAppointments!, augustAppointments!,
      septemberAppointments!, octoberAppointments!, novemberAppointments!,decemberAppointments!,
    ]);
  }, [
    januaryAppointments, februaryAppointments, marchAppointments, aprilAppointments,
    mayAppointments, juneAppointments, julyAppointments, augustAppointments,
    septemberAppointments, octoberAppointments, novemberAppointments, decemberAppointments,
  ]);

  useEffect(() => {
    getAppointmentsByMonth(appointments);
  }, [appointments]);

  return {data};
};