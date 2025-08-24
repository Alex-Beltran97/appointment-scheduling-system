import api from './api';

type employeeParams = {
  id?: string | number | undefined;
  docNum?: string | number | undefined;
};

export const getEmployeeByDocNum = ({docNum}: employeeParams) => {
  return api.get(`/employee?docNum=${docNum}`);
};

export const getEmployeeById = ({id}: employeeParams) => {
  return api.get(`/employee/${id}`);
};