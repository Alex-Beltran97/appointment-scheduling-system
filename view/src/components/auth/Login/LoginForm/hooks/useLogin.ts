import { useEffect, useState } from "react";
import type { Login } from "../../../../../types/auth/Register";
import { useNotificationStore } from "../../../../../store/useNotificationStore";
import { useAuthStore } from "../../../../../store/useAuthStore";
import { type AxiosError } from 'axios';

export function useLogin() {
  const [initialValues, setInitialValues] = useState<Login>({
    username: "",
    password: ""
  });

  const {showNotification} = useNotificationStore();
  const {login: loginStore} = useAuthStore();

  const handleLogin = async (values: Login) => {
    try {
      await loginStore(values);
      showNotification("Inicio de sesión exitoso", "success");
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        showNotification("Error al iniciar sesión. Por favor, verifica tus credenciales.", "error");
        return;
      }
      showNotification("Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.", "error");
      console.error("Error al iniciar sesión:", error);
    };
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
    handleLogin,
  };
};