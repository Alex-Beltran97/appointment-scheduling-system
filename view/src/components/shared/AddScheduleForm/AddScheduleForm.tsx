import { useState } from "react";
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Box, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import style from './AddScheduleForm.module.css';

const days = [
  { label: "Lunes", value: "1" },
  { label: "Martes", value: "2" },
  { label: "Miércoles", value: "3" },
  { label: "Jueves", value: "4" },
  { label: "Viernes", value: "5" },
  { label: "Sábado", value: "6" },
  { label: "Domingo", value: "7" },
];

interface AddScheduleFormProps {
  onAdd: (item: { day: string; initHour: string; endtHour: string }) => void;
};

const AddScheduleForm = ({onAdd}: AddScheduleFormProps) => {
  const [day, setDay] = useState("");
  const [initHour, setInitHour] = useState<Dayjs | null>(null);
  const [endtHour, setEndtHour] = useState<Dayjs | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
    const newErrors: typeof errors = {};
    if (!day) newErrors.day = "El día es obligatorio";
    if (!initHour) newErrors.initHour = "La hora de inicio es obligatoria";
    if (!endtHour) newErrors.endtHour = "La hora de fin es obligatoria";
    if (initHour && endtHour && !endtHour.isAfter(initHour)) {
      newErrors.endtHour = "La hora de fin debe ser mayor que la de inicio";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    onAdd({
      day,
      initHour: initHour!.format("HH:mm:ss"),
      endtHour: endtHour!.format("HH:mm:ss"),
    });

    setDay("");
    setInitHour(null);
    setEndtHour(null);
    setErrors({});
  };

  return (<Box>
    <IconButton onClick={handleAdd}>
      <AddCircleOutlineIcon />
    </IconButton>
    <Box className={style.field__container}>
      <Typography variant="h6" component="h2" gutterBottom>
        Dia
      </Typography>
      <FormControl fullWidth variant="outlined" error={!!errors.day}>
        <InputLabel>Día</InputLabel>
        <Select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          label="Día"
        >
          {days.map((d) => (
            <MenuItem key={d.value} value={d.value}>
              {d.label}
            </MenuItem>
          ))}
        </Select>
        {errors.day && <FormHelperText>{errors.day}</FormHelperText>}
      </FormControl>
    </Box>
    <Box className={style.field__container}>
      <Typography variant="h6" component="h2" gutterBottom>
        Hora de inicio
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Hora de inicio"
          value={initHour}
          onChange={(value) => setInitHour(value as Dayjs)}
          ampm
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              error: !!errors.initHour,
              helperText: errors.initHour,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
    <Box className={style.field__container}>
      <Typography variant="h6" component="h2" gutterBottom>
        Hora de fin
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Hora de inicio"
          value={endtHour}
          onChange={(value) => setEndtHour(value as Dayjs)}
          ampm
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              error: !!errors.initHour,
              helperText: errors.initHour,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  </Box>);
};

export default AddScheduleForm;