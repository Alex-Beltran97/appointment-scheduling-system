import { useEffect, useState } from "react";
import type { Profile } from "../../../../../types/auth/Register";
import moment, { type Moment } from "moment";
import { register } from "../../../../../service/authService";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../../../../../store/useNotificationStore";

export function useLogin() {
  const [initialValues, setInitialValues] = useState<Profile>({
    userRole: "",
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
    nitCode: "",
    employeeCode: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

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
    } catch (error) {
      showNotification("Error al registrar el usuario", "error");
      console.error("Error al registrar el usuario:", error);
    };
  }

  useEffect(() => {

    return () => {
      setInitialValues({
        userRole: "",
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
        nitCode: "",
        employeeCode: "",
        username: "",
        password: "",
        confirmPassword: ""
      });
    };
  }, []);

  return {
    initialValues,
    handleSubmit
  };
};