import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import * as Yup from 'yup';

import styles from './RegisterForm.module.css';


const validationSchema = Yup.object().shape({
  userRole: Yup.string().required('Este campo es obligatorio'),
  name: Yup.string().required('Este campo es obligatorio'),
  lastName: Yup.string().required('Este campo es obligatorio'),
  secondLastName: Yup.string().required('Este campo es obligatorio'),
  birthDate: Yup.date().nullable().required('Este campo es obligatorio'),
  phone: Yup.string().matches(/^\d+$/, 'Solo números').required('Este campo es obligatorio'),
  country: Yup.string().required('Este campo es obligatorio'),
  department: Yup.string().required('Este campo es obligatorio'),
  city: Yup.string().required('Este campo es obligatorio'),
  email: Yup.string().email('Correo inválido').required('Este campo es obligatorio'),
  docType: Yup.string().required('Este campo es obligatorio'),
  docNum: Yup.string().matches(/^\d+$/, 'Solo números').required('Este campo es obligatorio'),
  nitCode: Yup.string().matches(/^\d+$/, 'Solo números').required('Este campo es obligatorio'),
  employeeCode: Yup.string().required('Este campo es obligatorio'),
  username: Yup.string().required('Este campo es obligatorio'),
  password: Yup.string().required('Este campo es obligatorio'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Este campo es obligatorio'),
});

const RegisterForm = () => {
  const [initialValues] = useState({
    userRole: "",
    name: "",
    lastName: "",
    secondLastName: "",
    birthDate: null,
    phone: "",
    country: "",
    department: "",
    city: "",
    email: "",
    docNum: "",
    docType: "",
    nitCode: "",
    employeeCode: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  return (<>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue}) => (
        <Form className={styles.form__container}>
          <FormControl className={styles.form__rolPicker}>
            <InputLabel id="select-userRole-label">Tipo de rol</InputLabel>
            <Select
              id="select-userRole"
              name="userRole"
              labelId="select-userRole-label"
              value={values.userRole}
              label="Tipo de rol"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="1">Adminsitrador</MenuItem>
              <MenuItem value="2">Usuario</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="name"
            name="name"
            label="Nombres"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name ? errors.name : ""}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Primer Apellido"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName ? errors.lastName : ""}
          />
          <TextField
            id="secondLastName"
            name="secondLastName"
            label="Segundo Apellido"
            value={values.secondLastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.secondLastName && Boolean(errors.secondLastName)}
            helperText={touched.secondLastName && errors.secondLastName ? errors.secondLastName : ""}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              name="birthDate"        
              value={values.birthDate}
              onChange={(value) => setFieldValue('birthDate', value)}
              slotProps={{
                textField: {
                  name: 'birthDate',
                  error: touched.birthDate && Boolean(errors.birthDate),
                  helperText: touched.birthDate && errors.birthDate,
                },
              }}
            />
          </LocalizationProvider>
          <TextField            
            id="phone"
            name="phone"
            label="Teléfono"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone ? errors.phone : ""}
          />
          <FormControl>
            <InputLabel id="select-country-label">Pais</InputLabel>
            <Select
              id="select-country"
              name="country"
              labelId="select-country-label"
              value={values.country}
              label="Pais"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="COL">Colombia</MenuItem>
              <MenuItem value="ARG">Argentina</MenuItem>
              <MenuItem value="MX">Mexico</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="select-department-label">Departamento</InputLabel>
            <Select
              id="select-department"
              name="department"
              labelId="select-department-label"
              value={values.department}
              label="Departamento"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value={1001}>Cundinamarca</MenuItem>
              <MenuItem value={1002}>Meta</MenuItem>
              <MenuItem value={1003}>Valle del Cauca</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="select-city-label">Ciudad</InputLabel>
            <Select
              id="select-city"
              name="city"
              labelId="select-city-label"
              value={values.city}
              label="Ciudad"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value={2001}>Bogota D.C.</MenuItem>
              <MenuItem value={2002}>Villavicencio</MenuItem>
              <MenuItem value={2003}>Cali</MenuItem>
            </Select>
          </FormControl>          
          <TextField
            id="email"
            name="email"
            label="Correo electronico"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : ""}
          />
          <FormControl>
            <InputLabel id="select-docType-label">Tipo de documento</InputLabel>
            <Select
              id="select-docType"
              name="docType"
              labelId="select-docType-label"
              value={values.docType}
              label="Tipo de documento"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="1">Pasaporte</MenuItem>
              <MenuItem value="2">Permiso especial de permanencia</MenuItem>
              <MenuItem value="3">Cedula de ciudadania</MenuItem>
              <MenuItem value="4">Cedula de extranjeria</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="docNum"
            name="docNum"
            label="Numero de documento"
            value={values.docNum}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.docNum && Boolean(errors.docNum)}
            helperText={touched.docNum && errors.docNum ? errors.docNum : ""}
          />
          <TextField
            id="nitCode"
            name="nitCode"
            label="NIT"
            value={values.nitCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nitCode && Boolean(errors.nitCode)}
            helperText={touched.nitCode && errors.nitCode ? errors.nitCode : ""}
          />
          <TextField
            id="employeeCode"
            name="employeeCode"
            label="Codigo de empleado"
            value={values.employeeCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.employeeCode && Boolean(errors.employeeCode)}
            helperText={touched.employeeCode && errors.employeeCode ? errors.employeeCode : ""}
          />
          <TextField
            id="username"
            name="username"
            label="Nombre de usuario"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username ? errors.username : ""}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Contraseña"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password ? errors.password : ""}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirmar Contraseña"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
          />
          <Button
            className={styles.form__button}
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >Registrarse</Button>
        </Form>
      )}
    </Formik>
  </>);
};

export default RegisterForm;