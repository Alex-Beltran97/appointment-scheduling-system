import { useCallback, useEffect, useState, type SetStateAction } from "react";
import { useProfileStore } from "../../../store/useProfileStore";
import { useContractStore } from "../../../store/useContract";
import EmployeeAccordion from "./EmployeeAccordion/EmployeeAccordion";

export interface IEmployee {
  userName: string;
  userDocNum: string;
  userEmployeeCode: string;
};

const ConsultantsTab = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const {profile} = useProfileStore();
  const {activeContracts, getActiveContracts} = useContractStore();

  useEffect(() => {
    getActiveContracts({
      companyNit: profile?.nitCode
    });
    sessionStorage.setItem('nit-code', String(profile?.nitCode));

    return () => {
      sessionStorage.getItem('nit-code');
    };
  }, [profile, getActiveContracts]);

  const handleProfiles = useCallback(async () => {
    if (activeContracts?.length === 0) return;

    const result = activeContracts?.map(contract => {
      const userName = contract?.employee_fullname;
      const userEmployeeCode = contract.employee_code;
      const userDocNum = contract.employee_doc_num;
      return ({userName, userDocNum, userEmployeeCode});
    });

    setEmployees(result as unknown as SetStateAction<IEmployee[]>);    
  }, [activeContracts]);

  useEffect(() => {
    handleProfiles();
  }, [handleProfiles]);
  
  return (<>
    {employees?.length && employees?.map((employee: IEmployee) => <EmployeeAccordion key={employee.userDocNum} employee={employee} />)}
  </>);
};

export default ConsultantsTab;