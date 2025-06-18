import { Box, Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, useTheme, type SelectChangeEvent, type Theme } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";

import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchForm.module.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const SearchForm = () => {
  const [initialValues] = useState({
    search: '',    
  });

  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (<>
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={() => {}}
    >
      {() => (
        <Form className={styles.form__container}>
          <TextField
            id="search"
            label="Nombre del servicio"
            variant="outlined"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Ingrese el nombre de un servicio aqui"
          />
          <FormControl fullWidth>
            <InputLabel id="multiple-categories-label">Seleccione las categorias que desee</InputLabel>
            <Select
              labelId="multiple-categories-label"
              id="multiple-categories"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Seleccione las categorias que desee" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="secondary" fullWidth>Buscar</Button>
        </Form>
      )}
    </Formik>
  </>);
};

export default SearchForm;