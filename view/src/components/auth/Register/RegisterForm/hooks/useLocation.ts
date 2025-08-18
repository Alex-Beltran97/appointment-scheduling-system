import { useEffect, useState, type SetStateAction } from "react";
import type { CityItem, CountryItem, DepartmentItem } from "../../../../../types/auth/Register";
import { cities, countries, departments } from "../../../../../service/externalService";
import { useNotificationStore } from "../../../../../store/useNotificationStore";

export function useLocation() {
  const [countriesData, setCountriesData] = useState<CountryItem[]>([]);
  const [departmentsData, setDepartmentsData] = useState<DepartmentItem[]>([]);
  const [citiesData, setCitiesData] = useState<CityItem[]>([]);
  const [isForeigner, setIsForeigner] = useState<boolean>(true);

  const {showNotification} = useNotificationStore();

  const handleCountriesData = async () => {
    try {
      const data = await countries();
      setCountriesData((data as unknown) as SetStateAction<CountryItem[]>);
    } catch (error) {
      showNotification("Error al cargar los paises", "error");
      console.log(error);
    }
  };

  const handleDepartmentsData = async () => {
    try {
      const data = await departments();
      setDepartmentsData((data as unknown) as SetStateAction<DepartmentItem[]>);
    } catch (error) {
      showNotification("Error al cargar los departamentos", "error");
      console.log(error);
    }
  };
  
  const handleCitiesData = async (id: string | undefined) => {
    try {
      const data = await cities(id);
      setCitiesData((data as unknown) as SetStateAction<CityItem[]>);
    } catch (error) {
      showNotification("Error al cargar las ciudades", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    handleCountriesData();
    handleDepartmentsData();

    return () => {
      setCountriesData([]);
      setDepartmentsData([]);
      setCitiesData([]);
      setIsForeigner(true);
    }
  }, []);

  return {
    countriesData,
    departmentsData,
    citiesData,
    isForeigner,
    setIsForeigner,
    handleCitiesData
  }
}