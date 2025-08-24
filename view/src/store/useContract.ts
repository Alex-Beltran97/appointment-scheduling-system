import { create } from 'zustand';
import type { Contract, IActiveContract } from '../types/Shared/Service';
import { getActiveContracts, getContracts } from '../service/contractsService';


type contractParams = {
  companyNit?: string | number | undefined;
  employeeDocType?: string | number | undefined;
  employeeDocNum?: string | number | undefined;
  employeeRoleId?: string | number | undefined;
};

interface ContractStore {
  contracts: Contract[];
  activeContracts: IActiveContract[];
  getContracts: (params: contractParams) => Promise<void>;
  getActiveContracts: (params: contractParams) => Promise<void>;
};

export const useContractStore = create<ContractStore>(set => ({
  contracts: [],
  activeContracts: [],
  getContracts: async ({companyNit, employeeDocNum, employeeDocType, employeeRoleId}:contractParams) : Promise<void> => {
    try {
      const { data } = await getContracts({companyNit, employeeDocNum, employeeDocType, employeeRoleId});
      set({ contracts: data.response });
      return Promise.resolve(data.response);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      throw error;
    }
  },
  getActiveContracts: async ({companyNit}:contractParams) : Promise<void> => {
    try {
      const { data } = await getActiveContracts({companyNit});
      set({ activeContracts: data.response });
      return Promise.resolve(data.response);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      throw error;
    }
  },
}));