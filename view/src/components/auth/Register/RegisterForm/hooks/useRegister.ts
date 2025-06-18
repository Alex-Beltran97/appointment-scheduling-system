import { useEffect, useState } from "react";
import type { Profile } from "../../../../../types/auth/Register";
import moment, { type Moment } from "moment";
import { register } from "../../../../../service/authService";
import { useNavigate } from "react-router-dom";

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


  const handleSubmit = async (values: Profile) => {
    try {
      const {dialCountry, phone, ...rest} = values;
      const payload: Profile = {
        ...rest,
        phone: `${dialCountry} ${phone}`,
        birthDate: (values.birthDate.toISOString() as unknown) as Moment,
      };
      await register(payload);
      alert('Usuario registrado exitosamente');
      navigate('/login');
    } catch (error) {
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