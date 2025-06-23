import { Router } from 'express';
import {availableSlotController} from '../../controller/consultant';

const {getAvailableSlots} = availableSlotController;

const router = Router();

router.get('/', getAvailableSlots.bind(availableSlotController));

export default router;