import {Router} from 'express';
import {planController} from '../../controller/auth';

const {getPlans} = planController;

const router = Router();

router.get('/', getPlans);

export default router;
