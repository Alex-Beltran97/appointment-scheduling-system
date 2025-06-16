import axios from 'axios';
import type { City, Country, CountryItem, Department, DepartmentItem } from '../types';

export const countries = () : Promise<CountryItem> => {
  const url = 'https://restcountries.com/v3.1/all?fields=name,cca2,flags,idd';
  return axios.get(url).then(response => {
    return response.data.map((country: Country) => {
      const { name: nameCountry, cca2, flags, idd } = country;
      const name = nameCountry?.common;
      const code = cca2;
      const dial_code = `${idd?.root}${idd?.suffixes[0]}`;
      const flag = `${flags?.svg}`;

      return ({
        label: name, name: `${dial_code} ${name}`, code, dial_code, flag
      });
    });
  });
}

const axiosDepartments = axios.create({
  baseURL: 'https://api-colombia.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const departments = () : Promise<DepartmentItem> => {
  return axiosDepartments.get('/Department').then(response => {
    return response.data.map((department: Department) => ({id: department.id, name: department.name}));
  });
};

export const cities = (id: string | undefined) : Promise<void> => {
  return axiosDepartments.get(`/Department/${id}/Cities`).then(response => {
    return response?.data.map((city: City) => ({id: city.id, name: city.name}));
  });
};