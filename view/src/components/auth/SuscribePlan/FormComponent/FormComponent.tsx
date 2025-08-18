import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";

import { useSubscribe } from './hooks/useSubscribe';

import styles from './FormComponent.module.css';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const validationSchema = Yup.object({
  ownerFullname: Yup.string()
    .required('El nombre es obligatorio')
    .min(3, 'Debe tener al menos 3 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'Solo letras y espacios permitidos'),

  creditCardNum: Yup.string()
    .required('Número de tarjeta requerido')
    .matches(/^\d{16}$/, 'Debe ser un número de 16 dígitos'),

  expirationDate: Yup.string()
    .required('Fecha de vencimiento requerida')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido. Usa MM/AA'),

  securityCode: Yup.string()
    .required('Código de seguridad requerido')
    .matches(/^\d{3,4}$/, 'Debe tener 3 o 4 dígitos'),

  phone: Yup.string()
    .required('Número de teléfono requerido')
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Formato inválido. Usa 123-456-7890'),
});

const FormComponent = () => {
  
  const navigate = useNavigate();

  const { initialValues } = useSubscribe();

  return (<>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, {setSubmitting}) => {
        console.log("Form submitted with values:", values);
        setSubmitting(false);
      }}
    >
      {({values, errors, touched, handleChange, handleBlur, isSubmitting}) => (
        <Form className={styles.form__container}>
          <TextField
            id="owner-fullname"
            name="ownerFullname"
            variant="outlined"
            label="Nombre completo del titular"
            value={values.ownerFullname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.ownerFullname && Boolean(errors.ownerFullname)}
            helperText={touched.ownerFullname && errors.ownerFullname ? errors.ownerFullname : ""}
          />
          <TextField
            id="credit-card-num"
            name="creditCardNum"
            variant="outlined"
            label="Número de tarjeta de crédito"
            value={values.creditCardNum}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.creditCardNum && Boolean(errors.creditCardNum)}
          />
          <TextField
            id="expiration-date"
            name="expirationDate"
            variant="outlined"
            label="Fecha de vencimiento (MM/AA)"
            value={values.expirationDate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.expirationDate && Boolean(errors.expirationDate)}
            helperText={touched.expirationDate && errors.expirationDate ? errors.expirationDate : ""}
          />
          <TextField
            id="security-code"
            name="securityCode"
            variant="outlined"
            label="Código de seguridad (CVV/CVC)"
            value={values.securityCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.securityCode && Boolean(errors.securityCode)}
            helperText={touched.securityCode && errors.securityCode ? errors.securityCode : ""}
          />
          <TextField
            id="phone"
            name="phone"
            type="tel"
            label="Teléfono"
            variant="outlined"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone ? errors.phone : ""}
            placeholder="123-456-7890"
          />
          <Button type="submit" variant="contained" disabled={isSubmitting} fullWidth >Finalizar compra</Button>
          <Button variant="contained" fullWidth onClick={() =>  navigate('/plans')} color="error">Cancelar compra</Button>
        </Form>
      )}
    </Formik>
  </>);
};

export default FormComponent;