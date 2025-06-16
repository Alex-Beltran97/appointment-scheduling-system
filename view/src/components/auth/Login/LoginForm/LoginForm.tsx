import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import styles from './LoginForm.module.css';
import { useState } from "react";
import { login } from "../../../../service/authService";
import type { Login } from "../../../../types";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Requerido'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Requerido'),
});

const LoginForm = () => {
  const [initialValues] = useState<Login>({
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

  return (<>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleLogin(values);
          setSubmitting(false);
        }, 500);
      }}
    >
      {({values, errors, touched, handleChange, handleBlur, isSubmitting}) => (
        <Form className={styles.form_container}>
          <TextField
            id="username"
            label="Nombre de usuario"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username ? errors.username : ""}
          />
          <TextField
            id="password"
            label="Contrasña"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password ? errors.password : ""}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >Iniciar Sesion</Button>
        </Form>
      )}
    </Formik>
  </>);
};

export default LoginForm;