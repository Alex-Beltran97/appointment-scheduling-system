import { Router } from 'express';
import {consultantAvailabilityController} from '../../controller/consultant';

const {getAvailabilities, getAvailability, createAvailability, updateAvailablity, deleteAvailablity} = consultantAvailabilityController;

const router = Router();

router.get('/', getAvailabilities.bind(consultantAvailabilityController));
router.get('/:id', getAvailability.bind(consultantAvailabilityController));
router.post('/', createAvailability.bind(consultantAvailabilityController));
router.patch('/:id', updateAvailablity.bind(consultantAvailabilityController));
router.delete('/:id', deleteAvailablity.bind(consultantAvailabilityController));

export default router;