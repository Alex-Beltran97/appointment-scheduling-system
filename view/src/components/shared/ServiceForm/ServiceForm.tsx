import { Box, Chip, Divider, TextField, Typography } from "@mui/material";
import ServiceInteractionButtons from "../ServiceInteractionButtons/ServiceInteractionButtons";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import style from './ServiceForm.module.css';
import { useCallback, useEffect, useRef, useState } from "react";
import type { Availability, AvailabilityPayload, ScheduleItem, Service, ServicePayload } from "../../../types/Shared/Service";
import { useNavigate } from "react-router-dom";
import { useServiceStore } from "../../../store/useServiceStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNotificationStore } from "../../../store/useNotificationStore";
import AddScheduleForm from "../AddScheduleForm/AddScheduleForm";
import { getHourFormat, getWeekDayName } from "../../../utils";


const validationSchema = Yup.object({
  name: Yup.string()
    .required('El título es requerido')
    .max(100, 'Máximo 100 caracteres'),
  description: Yup.string()
    .required('La descripción es requerida')
    .min(10, 'Mínimo 10 caracteres'),
  price: Yup.number()
    .required('El precio es requerido')
    .min(1, 'Debe ser mayor que 0'),
  durationMinutes: Yup.number()
    .required('La duración es requerida')
    .min(1, 'Debe ser mayor que 0'),
  schedules: Yup.array().of(
    Yup.object({
      day: Yup.string().required(),
      initHour: Yup.string().required(),
      endtHour: Yup.string().required(),
    })
  ).min(1, "Debe agregar al menos un horario"),
});

interface Props {
  serviceId?: string | number;
};

const ServiceForm = ({serviceId}: Props) => {
  const {idUser} = useAuthStore();

  const [initialValues, setInitialValues] = useState<ServicePayload>({
    consultant_id: idUser,
    name: '',
    description: '',
    price: 0,
    durationMinutes: 0,
    schedules: [],
  });

  const navigate = useNavigate();

  const {createService, getServiceById, updateServiceById, createAvailability, deleteServiceById} = useServiceStore();
  const {showNotification} = useNotificationStore();

  const [serviceById] = useState(serviceId);

  const handleGetServiceById = useCallback(async (id: string | number) => {
    try {
      const result = await (getServiceById(id) as unknown) as Service;

      setInitialValues({
        consultant_id: idUser,
        name: result.name,
        description: result.description,
        price: +result.price,
        durationMinutes: result.durationMinutes,
        schedules: result.consultantAvailabilities.map((availability) => ({
          day: availability.weekday.toString(),
          initHour: availability.start_time,
          endtHour: availability.end_time,
        })),
      });

    } catch (error) {
      showNotification('Error al obtener el servicio', 'error');
      console.error('Error fetching service by ID:', error);
    }
  }, [getServiceById, showNotification, idUser]);
  
  useEffect(() => {
    if (serviceById) {
      handleGetServiceById(serviceById);
    };
  }, [serviceById, handleGetServiceById]);

  const handleCreateService = async (values: ServicePayload) => {
    try {

      const {schedules, ...rest} = values;

      const {data} = await (createService(rest) as unknown) as {data: { response: Service}};

      const serviceId = data?.response?.id;

      await handleCreateAvailabilities(serviceId, schedules!);
      showNotification('Servicio creado exitosamente','success');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating service:', error);
      showNotification('Error al crear el servicio', 'error');
    }
  };

  const handleUpdateService = async (id: string | number | undefined, values: ServicePayload) => {
    try {

      const {schedules, ...rest} = values;

      const result = await (updateServiceById(id, rest) as unknown) as Service;

      const serviceId = id ?? result?.id;

      await handleCreateAvailabilities(serviceId, schedules!, result.consultantAvailabilities);
      showNotification('Servicio creado exitosamente','success');
      navigate('/dashboard');
    } catch (error) {
      showNotification('Error al actualizar el servicio', 'error');
      console.error('Error creating service:', error);
    }
  };

  const handleCreateAvailabilities = (serviceId: string | number, schedules: ScheduleItem[], consultantAvailabilities?: Availability[]): Promise<void> => {
    for (const schedule in schedules) {
      const payload: AvailabilityPayload = {
        service_id: +serviceId,
        weekday: +schedules[schedule].day,
        start_time: schedules[schedule].initHour,
        end_time: schedules[schedule].endtHour,
      };
      handleCreateAvailability(payload, consultantAvailabilities![schedule]);
    };

    return Promise.resolve();
  };

  const handleCreateAvailability = async (payload: AvailabilityPayload, availability: Availability) => {
    try {
      if (
        payload?.start_time === availability?.start_time &&
        payload?.end_time === availability?.end_time
      ) {
        if (payload?.weekday === availability?.weekday) {
          setTimeout(() => {
            showNotification('Horario ya existe', 'info');
          }, 2000);
          return;
        };
      };
      await createAvailability(payload);
      showNotification('Disponibilidad creada exitosamente', 'success');
    } catch (error) {
      showNotification('Error al crear la disponibilidad', 'error');
      console.error('Error creating availability:', error);
    }
  };
  
  const submitBtn = useRef<HTMLButtonElement | null>(null);

  const handleCleanFields = useCallback(() => {
  setInitialValues({
    consultant_id: idUser,
    name: '',
    description: '',
    price: 0,
    durationMinutes: 0,
    schedules: [],
  });
}, [idUser]);

  useEffect(() => {
    return handleCleanFields();
  }, [handleCleanFields]);

  return (<>
    <ServiceInteractionButtons
      handleReturn={() => navigate('/dashboard')}
      handleSubmit={() => submitBtn?.current?.click()}
      handleDelete={() => {
        deleteServiceById(serviceById);
        navigate('/dashboard');
      }}
      toEdit={!serviceById}
    />
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (serviceById) {
          handleUpdateService(serviceById, values);
          return;
        };
        handleCreateService(values);
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <Form className={style.form__container}>
          <Box className={style.field__container}>
            <Typography variant="h6" component="h2" gutterBottom minWidth={200}>
              Titulo
            </Typography>
            <TextField
              name="name"
              fullWidth
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Box>
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Descripcion
            </Typography>
            <TextField
              name="description"
              label="Tu mensaje"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
          </Box>
          <Box className={style.field__container}>
            <Typography variant="h6" component="h2" gutterBottom>
              Duracion en minutos
            </Typography>
            <TextField
              name="durationMinutes"
              type="number"
              variant="outlined"
              value={values.durationMinutes}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.durationMinutes && Boolean(errors.durationMinutes)}
              helperText={touched.durationMinutes && errors.durationMinutes}
            />
          </Box>
          <Box className={style.field__container}>
            <Typography variant="h6" component="h2" gutterBottom>
              Precio
            </Typography>
            <TextField
              name="price"
              type="number"
              variant="outlined"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
            />
          </Box>
          <Divider />
          <Typography variant="h6" component="h2" textAlign='center' gutterBottom>
            Agregar horarios
          </Typography>
          <AddScheduleForm
            onAdd={(newItem) => {
              const updated = [...(values.schedules || []), newItem];
              setFieldValue('schedules', updated);
            }}
          />
          <Box mt={2} display="flex" flexDirection="column" gap={1}>
            {(values.schedules || []).map((item, index) => (
              <Chip
                key={index}
                label={`Día ${getWeekDayName(+item.day)} — ${getHourFormat(item.initHour)} a ${getHourFormat(item.endtHour)}`}
                onDelete={() => {
                  const updated = [...(values.schedules || [])];
                  updated.splice(index, 1);
                  setFieldValue('schedules', updated);
                }}
              />
            ))}
          </Box>
          <button ref={submitBtn} hidden type="submit"></button>
        </Form>
      )}
    </Formik>
  </>);
};

export default ServiceForm;