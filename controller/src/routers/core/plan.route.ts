import {Router} from 'express';
import {planController} from '../../controller/core';

const {getPlans} = planController;

const router = Router();

router.get('/', getPlans);

export default router;
