import { Box, Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from 'yup';

import styles from './FormChangeAppointment.module.css';
import { useRef, useState } from "react";
import { useAppointmentStore } from "../../../../store/useAppointment";
import { useNotificationStore } from "../../../../store/useNotificationStore";
import type { Appointment } from "../../../../types/Shared/Service";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  appointment: yup.string().required('El ID de agendamiento es requerido')
});

const FormChangeAppointment = () => {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [initialValues] = useState({
    appointment: ''
  });

  const {getAppointments, deleteAppointment} = useAppointmentStore();
  const {showNotification} = useNotificationStore();

  const formRef = useRef<HTMLFormElement>(null);

  const handleReschedule = () => {
    setIsRescheduling(true);
    if (formRef.current) {
      formRef.current.requestSubmit();
    };
  };
  
  const handleCancel = () => {
    setIsRescheduling(false);
    if (formRef.current) {
      formRef.current.requestSubmit();
    };
  };

  const navigate = useNavigate();

  const handleSubmit = async (idAppointment: string) => {
    try {
      const [result] = await getAppointments({
        id_appointment: idAppointment,
      }) as unknown as [Appointment];
      if (!result) {
        showNotification('No se encontró una cita con el ID proporcionado.', 'error');
        return;
      };
      const appointmentId = result.id;
      const serviceId = result.service!.id;
      if (isRescheduling) {
        navigate(`/scheduling?service-id=${serviceId}&appointment-id=${appointmentId}`);
        return;
      };
      deleteAppointment(appointmentId);
      showNotification('Cita cancelada exitosamente.', 'success');
      setTimeout(() => {
        navigate('/search');
      }, 1000);
    } catch (error) {
      showNotification('Ocurrió un error al procesar la solicitud. Inténtalo más tarde.', 'error');
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (<>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values) => {
        const _appointementId = values.appointment.trim();
        handleSubmit(_appointementId);
      }}
    >
      {({handleChange, handleSubmit, handleBlur, values, errors}) => (
        <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <TextField
            id="appointment"
            label="ID de agendamiento"
            value={values.appointment}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.appointment)}
            helperText={errors.appointment}
            fullWidth
          />
          <Box className={styles.button__group}>
            <Button
              onClick={handleReschedule}
              variant="contained"
              color="secondary"
            >Reprogramar</Button>
            <Button
              onClick={handleCancel}
              variant="contained"
              color="error"
            >Cancelar</Button>
          </Box>
        </Form>
      )}
    </Formik>
  </>);
};

export default FormChangeAppointment;