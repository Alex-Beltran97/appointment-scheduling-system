import { create } from 'zustand';
import { getEmployeeByDocNum, getEmployeeById } from '../service/employeeService';

interface EmployeeStore {
  getEmployeeByDocNum: (docNum: number) => Promise<void>;
  getEmployeeById: (id: string) => Promise<void>;
};

export const useEmployeeStore = create<EmployeeStore>(() => ({  
  getEmployeeByDocNum: async (docNum: number) : Promise<void> => {
    try {
      const { data } = await getEmployeeByDocNum({docNum});
      return Promise.resolve(data.response);
    } catch (error) {
      console.error('Error fetching employee by docNum:', error);
      throw error;
    }
  },
  getEmployeeById: async (id: string) : Promise<void> => {
    try {
      const { data } = await getEmployeeById({id});
      return Promise.resolve(data.response);
    } catch (error) {
      console.error('Error fetching employee by id:', error);
      throw error;
    }
  }  
}));