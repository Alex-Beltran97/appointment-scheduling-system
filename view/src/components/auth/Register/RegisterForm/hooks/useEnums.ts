import { useEffect, useState, type SetStateAction } from "react";
import type { DocType, UserRole } from "../../../../../types/auth/Register";
import { userRoles } from "../../../../../service/userRoleService";
import { docTypes } from "../../../../../service/docTypeService";

export function useEnums() {
  const [userRolesData, setUserRolesData] = useState<UserRole[]>([]);
  const [docTypesData, setDocTypesData] = useState<DocType[]>([]);
  
  const handleUserRolesData = async () => {
    try {
      const data = await userRoles();
      setUserRolesData((data as unknown) as SetStateAction<UserRole[]>);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDocTypesData = async () => {
    try {
      const data = await docTypes();
      setDocTypesData((data as unknown) as SetStateAction<DocType[]>);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    handleUserRolesData();    
    handleDocTypesData();

    return () => {
      setUserRolesData([]);
      setDocTypesData([]);
    };
  }, []);

  return {
    userRolesData,
    docTypesData
  };
};