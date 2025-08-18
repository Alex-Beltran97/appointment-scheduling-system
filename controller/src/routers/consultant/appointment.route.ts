import { Router } from 'express';
import {appointmentController} from '../../controller/consultant';

const {getAppointments, getAppointment, createAppointment, completeAppointment, deleteAppointment} = appointmentController;

const router = Router();

router.get('/', getAppointments.bind(appointmentController));
router.get('/:id', getAppointment.bind(appointmentController));
router.get('/complete/:id', completeAppointment.bind(appointmentController));
router.post('/', createAppointment.bind(appointmentController));
router.delete('/:id', deleteAppointment.bind(appointmentController));

export default router;