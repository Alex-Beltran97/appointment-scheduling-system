import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import * as Yup from 'yup';

import { useLocation } from './hooks/useLocation';
import { useEnums } from './hooks/useEnums';
import { useLogin } from './hooks/useRegister';

import styles from './RegisterForm.module.css';

const validationSchema = Yup.object().shape({
  userRole: Yup.string().required('Este campo es obligatorio'),
  name: Yup.string().required('Este campo es obligatorio'),
  lastName: Yup.string().required('Este campo es obligatorio'),
  secondLastName: Yup.string().required('Este campo es obligatorio'),
  birthDate: Yup.date().nullable().required('Este campo es obligatorio').test(
    'age',
    'Debes ser mayor de 18 años',
    function (value) {
      if (!value) return false;
      const today = new Date();
      const birth = new Date(value);
      const age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      return age > 18 || (age === 18 && m >= 0);
    }
  ),
  phone: Yup.string().matches(/^\d+$/, 'Solo números').required('Este campo es obligatorio'),
  countryCode: Yup.string().required('Este campo es obligatorio'),
  departmentCode: Yup.string(),
  cityCode: Yup.string(),
  email: Yup.string().email('Correo inválido').required('Este campo es obligatorio'),
  docType: Yup.string().required('Este campo es obligatorio'),
  docNum: Yup.string().matches(/^\d+$/, 'Solo números').required('Este campo es obligatorio'),
  nitCode: Yup.string().matches(/^\d+$/, 'Solo números').required('Este campo es obligatorio'),
  employeeCode: Yup.string().required('Este campo es obligatorio'),
  username: Yup.string().required('Este campo es obligatorio'),
  password: Yup.string().required('Este campo es obligatorio').min(8, 'Debe tener al menos 8 caracteres')
  .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .matches(/[0-9]/, 'Debe contener al menos un número')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Debe contener al menos un carácter especial'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Este campo es obligatorio'),
});

const RegisterForm = () => {

  const {
    citiesData, countriesData, departmentsData,
    handleCitiesData, isForeigner, setIsForeigner
  } = useLocation();
  const {docTypesData, userRolesData} = useEnums();
  const {handleSubmit, initialValues} = useLogin();
  
  return (<>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
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
              {userRolesData.map(role => (
                <MenuItem key={role.id} value={role.id}>{role.role}</MenuItem>
              ))}
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
                  id: "birthDate",   
                  name: 'birthDate',
                  error: touched.birthDate && Boolean(errors.birthDate),
                  helperText: touched.birthDate && typeof errors.birthDate === 'string' ? errors.birthDate : '',
                  onBlur: handleBlur,
                },
              }}
            />
          </LocalizationProvider>
          <Autocomplete
            disablePortal
            options={countriesData}
            getOptionLabel={(option) => option.name}
            onChange={(e, newValue) => {
              setFieldValue('dialCountry', newValue?.dial_code || "");
            }}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                  <Box key={key} component="li" {...rest} display="flex" alignItems="center">
                    <img
                      loading="lazy"
                      width={20}
                      src={option.flag}
                      alt={option.code}
                      style={{ marginRight: 10 }}
                    />
                    {option.name}
                  </Box>
                )
              }
            }
            renderInput={(params) => <TextField {...params}  label="Indicativo de pais" />}
          />
          <TextField            
            id="phone"
            name="phone"
            type="tel"
            label="Teléfono"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone ? errors.phone : ""}
          />
          <Autocomplete
            disablePortal
            options={countriesData}
            onChange={(e, newValue) => {
              setFieldValue('countryCode', newValue?.code || "");
              setIsForeigner(newValue?.code !== 'CO');
            }}
            renderInput={(params) => <TextField {...params}  label="Pais" />}
          />
          <Autocomplete
            disablePortal
            disabled={isForeigner}
            options={departmentsData}
            getOptionLabel={(option) => option.name}
            onChange={(e, newValue) => {
              setFieldValue('departmentCode', newValue?.id || "");
              handleCitiesData(newValue?.id);              
            }}
            renderInput={(params) => <TextField {...params}  label="Departamento" />}
          />
          <Autocomplete
            disablePortal
            disabled={isForeigner}
            options={citiesData}
            getOptionLabel={(option) => option.name}
            onChange={(e, newValue) => {
              setFieldValue('cityCode', newValue?.id || "");              
            }}
            renderInput={(params) => <TextField {...params}  label="Ciudad" />}
          />
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
              {docTypesData.map(doc => (
                <MenuItem key={doc.id} value={doc.id}>{doc.docType}</MenuItem>
              ))}
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
            color="secondary"
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