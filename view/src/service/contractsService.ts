import api from './api';

type contractParams = {
  companyNit?: string | number | undefined;
  employeeDocType?: string | number | undefined;
  employeeDocNum?: string | number | undefined;
  employeeRoleId?: string | number | undefined;
};

export const getContracts = ({companyNit, employeeDocNum, employeeDocType, employeeRoleId}: contractParams) => {
  return api.get(
      `/contract?companyNit=${companyNit}&employeeDocType=${employeeDocType}&employeeDocNum=${employeeDocNum}&employeeRoleId=${employeeRoleId}`
    );
};

export const getActiveContracts = ({companyNit}: contractParams) => {
  return api.get(
      `/active-contract-view?companyNit=${companyNit}`
    );
};
