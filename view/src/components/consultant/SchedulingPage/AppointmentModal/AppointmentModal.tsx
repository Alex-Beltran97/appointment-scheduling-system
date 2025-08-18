import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import type { Event } from "react-big-calendar";
import { useServiceStore } from "../../../../store/useServiceStore";
import { useNotificationStore } from "../../../../store/useNotificationStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Appointment, Service } from "../../../../types/Shared/Service";
import { useAppointmentStore } from "../../../../store/useAppointment";
import * as Yup from 'yup';
import { v4 as uuidV4 } from 'uuid'
import dayjs from "dayjs";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  onClose: () => void;
  selectedEvent: Event | null;
};

const validationSchema = Yup.object({
  clientFullName: Yup.string()
    .required('El nombre completo es obligatorio'),
  client_email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
  client_phone: Yup.string()
    .required('El número de teléfono es obligatorio'),
});

const AppointmentModal = ({open, onClose, selectedEvent}: Props) => {
  const [service, setService] = useState<Service | null>(null);

  const [initialValues, setInitialValues] = useState({
    consultant_id: service?.consultant?.id || 0,
    service_id: service?.id || 0,
    clientFullName: "",
    client_email: "",
    client_phone: "",
    date: handleGetSlotDatetime(selectedEvent)?.date || "",
    start_time: handleGetSlotDatetime(selectedEvent)?.start || "",
    end_time: handleGetSlotDatetime(selectedEvent)?.end || "",
    notes: "",
    status_id: 1, 
    appoinment_id: ''
  });

  function handleGetSlotDatetime(selectedEvent: Event | null) {
    if (selectedEvent?.start && selectedEvent?.end) {
      const startDate = dayjs(selectedEvent?.start);
      const endDate = dayjs(selectedEvent?.end);
      const date = startDate.format('YYYY-MM-DD');
      const start = startDate.format('HH:mm:ss');
      const end = endDate.format('HH:mm:ss');
      return ({date, start, end});
    };
    return ({date: '', start: '', end: ''});
  };

  useEffect(() => {
    handleGetSlotDatetime(selectedEvent);
  }, [selectedEvent]);

  const [searchParams] = useSearchParams();

  const {getServiceById} = useServiceStore();
  const {showNotification} = useNotificationStore();

  const handleGetServiceById = useCallback(async (serviceId: string) => {
    try {
      const service = await (getServiceById(serviceId) as unknown) as Service;
      if (!service) {
        showNotification('Servicio no encontrado.', 'error');
        return;
      };
      setService(service);
    } catch (error) {
      console.error('Error al obtener los horarios disponibles:', error);
      showNotification('No se pudieron obtener los horarios disponibles. Inténtalo más tarde.', 'error');
    };
  }, [getServiceById, showNotification]);

  const {createAppointment, getAppointments, getAppointmentById, deleteAppointment} = useAppointmentStore();

  const navigate = useNavigate();

  const handleValidateAppointment = useCallback(async (email: string, phone: string) => {
      const result = await getAppointments({}) as unknown as Appointment[];
      const hasAppointment = result.some(appointment =>
        (appointment.client_email[0] === email || appointment.client_phone[0] === phone) &&
        appointment.status?.id === 1
      );
      if (hasAppointment) {
        return Promise.reject('Cita ya existe con el mismo correo electrónico o teléfono.');
      }
      return Promise.resolve();
    }, [getAppointments]);

  const [isConsultant, setIsConsultant] = useState(false);
  const [appointmentId] = useState<string | number | undefined>(searchParams.get('appointment-id') as string);

  const handleSubmitAppointment = useCallback(async (payload: Appointment) => {
    try {
      if (isConsultant) {
        await deleteAppointment(appointmentId);
      };
      await handleValidateAppointment(payload.client_email[0], payload.client_phone[0]);
      await createAppointment(payload);
      showNotification('Cita creada exitosamente.', 'success');
      navigate('/search');
      onClose();
    } catch (error) {
      console.error('Error al crear la cita:', error);
      showNotification(`No se pudo crear la cita. Inténtalo más tarde. ${error}`, 'error');
    }
  }, [createAppointment, deleteAppointment, handleValidateAppointment, isConsultant, appointmentId, navigate, onClose, showNotification]);

  useEffect(() => {
    const serviceId = searchParams.get('service-id');
    if (!serviceId) {
      showNotification('No se proporcionó un ID de servicio.', 'error');
      return;
    };
    handleGetServiceById(serviceId);
  }, [searchParams, handleGetServiceById, showNotification]);

  useEffect(() => {
    return () => {
      setInitialValues({
        consultant_id: service?.consultant?.id || 0,
        service_id: service?.id || 0,
        clientFullName: "",
        client_email: "",
        client_phone: "",
        date: handleGetSlotDatetime(selectedEvent)?.date || "",
        start_time: handleGetSlotDatetime(selectedEvent)?.start || "",
        end_time: handleGetSlotDatetime(selectedEvent)?.end || "",
        notes: "",
        status_id: 1, 
        appoinment_id: ''
      });
    };
  }, [selectedEvent, service]);


  const handleGetAppointmentById = useCallback(async (appointmentId: string) => {
    try {
      const appointment = await getAppointmentById(appointmentId) as unknown as Appointment;
      if (!appointment) {
        showNotification('Cita no encontrada.', 'error');
        return;
      };
      setInitialValues({
        ...initialValues,
        clientFullName: appointment.clientFullName || "",
        client_email: appointment.client_email[0] || "",
        client_phone: appointment.client_phone[0] || "",
        notes: appointment.notes || "",
      });
    } catch (error) {
      console.error('Error al obtener la cita:', error);
      showNotification('No se pudo obtener la cita. Inténtalo más tarde.', 'error');
    }
  }, []);

  useEffect(() => {
    if (appointmentId) {
      handleGetAppointmentById(appointmentId as string);
      setIsConsultant(true);
      return;
    };
  }, [appointmentId, handleGetAppointmentById]);

  return (<>
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Reservar cita
        </Typography>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const payload = {
              ...values,
              consultant_id: service?.consultant?.id || 0,
              service_id: service?.id || 0,
              client_email: [values.client_email],
              client_phone: [values.client_phone],
              appoinment_id: uuidV4(),
            } as Appointment;
            handleSubmitAppointment(payload);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <TextField
                fullWidth
                label="Nombre completo"
                id="clientFullName"
                name="clientFullName"
                value={values.clientFullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.clientFullName && errors.clientFullName)}
                helperText={touched.clientFullName && errors.clientFullName}
                margin="normal"
                disabled={isConsultant}
              />
              <TextField
                fullWidth
                label="Correo electrónico"
                id="client_email"
                name="client_email"
                value={values.client_email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.client_email && errors.client_email)}
                helperText={touched.client_email && errors.client_email}
                margin="normal"
                disabled={isConsultant}
              />
              <TextField
                fullWidth
                label="Teléfono"
                id="client_phone"
                name="client_phone"
                value={values.client_phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.client_phone && errors.client_phone)}
                helperText={touched.client_phone && errors.client_phone}
                margin="normal"
                disabled={isConsultant}
              />
              <TextField
                fullWidth
                label="Notas"
                id="notes"
                name="notes"
                value={values.notes}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={2}
                disabled={isConsultant}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Confirmar cita
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  </>);
};

export default AppointmentModal;