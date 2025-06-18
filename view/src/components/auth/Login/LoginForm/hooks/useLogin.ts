import { useEffect, useState } from "react";
import type { Login } from "../../../../../types/auth/Register";
import { useNavigate } from "react-router-dom";
import { login } from "../../../../../service/authService";

export function useLogin() {
  const [initialValues, setInitialValues] = useState<Login>({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async (values: Login) => {
    try {
      await login(values);
      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  useEffect(() => {
    return () => {
      setInitialValues({
        username: "",
        password: ""
      });
    };
  }, []);

  return {
    initialValues,
    handleLogin
  };
};