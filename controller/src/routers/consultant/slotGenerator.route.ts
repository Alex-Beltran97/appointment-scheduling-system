import { Router } from 'express';
import {slotGeneratorController} from '../../controller/consultant';

const {generateSlots} = slotGeneratorController;

const router = Router();

router.post('/', generateSlots);

export default router;