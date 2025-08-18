import { Router } from 'express';
import { appointmentStatusController } from '../../controller/consultant';

const router = Router();

const {getAllStatuses, getStatusById, createStatus, updateStatus, deleteStatus} = appointmentStatusController

router.get('/', getAllStatuses);
router.get('/:id', getStatusById);
router.post('/', createStatus);
router.patch('/:id', updateStatus);
router.delete('/:id', deleteStatus);

export default router;