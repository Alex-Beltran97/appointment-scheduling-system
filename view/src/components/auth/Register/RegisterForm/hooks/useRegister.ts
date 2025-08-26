import { useEffect, useState, type SetStateAction } from "react";
import type { Profile } from "../../../../../types/auth/Register";
import moment, { type Moment } from "moment";
import { register } from "../../../../../service/authService";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../../../../../store/useNotificationStore";
import { UserType } from "../../../../../utils";

export function useLogin(userType: UserType) {
  const [initialValues, setInitialValues] = useState<Profile>({
    userRole: handleUserType(userType),
    name: "",
    lastName: "",
    secondLastName: "",
    birthDate: moment(),
    dialCountry: "",
    phone: "",
    countryCode: "",
    departmentCode: "",
    cityCode: "",
    email: "",
    docNum: 0,
    docType: "",
    nitCode: sessionStorage.getItem("company-nit"),
    username: sessionStorage.getItem("employee-code"),
    password: "",
    confirmPassword: ""
  } as Profile | (() => Profile));

  const navigate = useNavigate();

  const {showNotification} = useNotificationStore();

  const handleSubmit = async (values: Profile) => {
    try {
      const {dialCountry, phone, ...rest} = values;
      const payload: Profile = {
        ...rest,
        phone: `${dialCountry} ${phone}`,
        birthDate: (values.birthDate.toISOString() as unknown) as Moment,
      };
      await register(payload);
      showNotification("Usuario registrado correctamente", "success");
      navigate('/login');
      sessionStorage.removeItem("company-nit");
      sessionStorage.removeItem("employee-code");
    } catch (error) {
      showNotification("Error al registrar el usuario", "error");
      console.error("Error al registrar el usuario:", error);
    };
  }

  function handleUserType(userType: UserType) {
    if (userType === UserType.company) return '1';
    if (userType === UserType.independent) return '2';
    return '';  
  };

  useEffect(() => {
    return () => {
      setInitialValues({
        userRole: handleUserType(userType),
        name: "",
        lastName: "",
        secondLastName: "",
        birthDate: moment(),
        dialCountry: "",
        phone: "",
        countryCode: "",
        departmentCode: "",
        cityCode: "",
        email: "",
        docNum: 0,
        docType: "",
        nitCode: sessionStorage.getItem("company-nit"),
        username: sessionStorage.getItem("employee-code"),
        password: "",
        confirmPassword: ""
      } as SetStateAction<Profile>);
    };
  }, []);

  return {
    initialValues,
    handleSubmit
  };
};