import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from 'yup';

import styles from './CompanyValidator.module.css';
import { useEnums } from "../hooks/useEnums";
import { useContractStore } from "../../../../../store/useContract";
import { useNotificationStore } from "../../../../../store/useNotificationStore";
import RegisterFormComponent from "../RegisterFormComponent/RegisterFormComponent";
import { UserType } from "../../../../../utils";

const validationSchema = Yup.object().shape({
  nitCompany: Yup.string()
    .required('El NIT de la empresa es obligatorio')
    .min(6, 'El NIT debe tener al menos 6 dígitos'),

  docType: Yup.string()
    .required('El tipo de documento es obligatorio'),

  docNum: Yup.number()
    .typeError('El número de documento debe ser numérico')
    .required('El número de documento es obligatorio')
    .positive('Debe ser un número positivo')
    .integer('Debe ser un número entero'),
});

interface IInitialValues {
  nitCompany: string,
  docType: number | string,
  docNum: number,
};

const CompanyValidator = () => {
  const [initialValues, setInitialValues] = useState<IInitialValues>({
    nitCompany: '',
    docType: '',
    docNum: 0,
  })

  const [loading, setLoading] = useState<boolean>(false);
  const [sended, setSended] = useState<boolean>(false);
  const [isCoordinator, setIsCoordinator] = useState<boolean>(false);

  const { docTypesData } = useEnums();

  const {contracts, getContracts} = useContractStore();

  const {showNotification} = useNotificationStore();

  const handleSubmit = async (values: IInitialValues) => {
    setSended(true);
    setLoading(true);
    try {
      await getContracts({
        companyNit: values.nitCompany,
        employeeDocNum: values.docNum,
        employeeDocType: values.docType,
        employeeRoleId: 1
      });

      sessionStorage.setItem("company-nit", values.nitCompany);
    } catch (error) {
      sessionStorage.removeItem("company-nit");
      sessionStorage.removeItem('employee-code');
      showNotification("Error al realizar la validacion de empresa.", "error");
      console.log('Error sendind company validations', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContractResult = useCallback(() => {    
    if (!sended) return;    
    try {
      if (!contracts?.length) throw new Error();
      const {0: response} = contracts;
      const _employeeCode = response?.employee?.employeeCode;
      sessionStorage.setItem('employee-code', _employeeCode);
      showNotification("Validacion exitosa. El usuario puede proceder a crear su perfil.", "success");
      setTimeout(() => setIsCoordinator(true), 3000);
    } catch (error) {
      sessionStorage.removeItem("company-nit");
      sessionStorage.removeItem('employee-code');
      showNotification("No se encontro ningun contrato con los datos ingresados. Verifique la informacion e intentlo de nuevo.", "error");
      console.log(error);
    }
  }, [contracts, showNotification, sended]);

  useEffect(() => {
    handleContractResult();
  }, [handleContractResult]);

  useEffect(() => {  
    return () => {
      setInitialValues({
        nitCompany: '',
        docType: '',
        docNum: 0,
      });

      sessionStorage.removeItem("company-nit");
      sessionStorage.removeItem('employee-code');

      setIsCoordinator(false);
      setLoading(false);
      setSended(false);
    }
  }, []);  

  if (isCoordinator) return <RegisterFormComponent userType={UserType.company} />;

  return (<>    
    <Typography className={styles.validation__subtitle} variant="h6" component='h2'>Antes de continuar, debes validar que tu usuario se encuentre activo con la empresa en la que estas vinculado, y validar que cuentes con roles de coordinador/a.</Typography>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
      }) => (
        <Form className={styles.validator__container}>
          <TextField
            id="nitCompany"
            name="nitCompany"
            label="NIT de la empresa"
            value={values.nitCompany}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nitCompany && Boolean(errors.nitCompany)}
            helperText={touched.nitCompany && errors.nitCompany ? errors.nitCompany : ''}
          />
          <FormControl>
            <InputLabel id="select-docType-label">
              Tipo de documento
            </InputLabel>
            <Select
              id="select-docType"
              name="docType"
              labelId="select-docType-label"
              value={values.docType}
              label="Tipo de documento"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {docTypesData.map((doc) => (
                <MenuItem key={doc.id} value={doc.id}>
                  {doc.docType}
                </MenuItem>
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
            helperText={touched.docNum && errors.docNum ? errors.docNum : ''}
          />
          <Button
            color="secondary"
            className={styles.form__button}
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {loading ? <CircularIndeterminate /> : <p>Registrarse</p> }
          </Button>
        </Form>
      )
      }
    </Formik>    
  </>);
};

function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress sx={{color: '#fff'}} />
    </Box>
  );
}

export default CompanyValidator;