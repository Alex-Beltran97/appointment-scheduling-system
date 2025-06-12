import {Router} from 'express';
import {planController} from '../../controller/core';

const {getPlans, getPlan, createPlan, updatePlan, deletePlan} = planController;

const router = Router();

router.get('/', getPlans);
router.get('/:id', getPlan);
router.post('/', createPlan);
router.patch('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router;
