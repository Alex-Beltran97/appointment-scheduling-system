import { Button, InputAdornment, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";

import * as Yup from 'yup';

import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchForm.module.css';
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  search: Yup.string()
    .trim()
    .min(2, 'Debe tener al menos 2 caracteres')
    .required('Este campo es obligatorio'),
});

const SearchForm = () => {
  const [initialValues] = useState({
    search: '',    
  });

  const navigate = useNavigate();

  return (<>
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const {search} = values;
        if (!search.trim()) return;
        navigate(`/search-result?q=${encodeURIComponent(search)}`);
      }}
    >
      {({ errors, touched, handleChange, handleBlur, values }) => (
        <Form className={styles.form__container}>
          <TextField
            id="search"
            name="search"
            label="Nombre del servicio"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.search}
            error={touched.search && Boolean(errors.search)}
            helperText={touched.search && errors.search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Ingrese el nombre de un servicio aqui"
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth>Buscar</Button>
        </Form>
      )}
    </Formik>
  </>);
};

export default SearchForm;