import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import styles from './LoginForm.module.css';
import { useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Correo inválido')
    .required('Requerido'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Requerido'),
});

const LoginForm = () => {
  const [initialValues] = useState({
    email: "",
    password: ""
  });

  return (<>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert('Datos enviados:\n' + JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      {({values, errors, touched, handleChange, handleBlur, isSubmitting}) => (
        <Form className={styles.form_container}>
          <TextField
            id="email"
            label="Correo Electrónico"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : ""}
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