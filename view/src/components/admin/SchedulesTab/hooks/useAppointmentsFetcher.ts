import { useCallback, useEffect } from "react";
import { useAppointmentStore } from "../../../../store/useAppointment";

export const useAppointmentsFetcher = (year: number) => {  
  const {appointments, getAppointments} = useAppointmentStore();
  
  const getAppointmentsByYearAndMonth = useCallback(async (year: string | number) => {
      await getAppointments({year});
    }, [getAppointments]);
    
    useEffect(() => {
      getAppointmentsByYearAndMonth(year);
    }, [year, getAppointmentsByYearAndMonth]);

    return {appointments}
};