import {Router} from 'express';
import {planController} from '../../controller/core';

const {getPlans, getPlan, createPlan, updatePlan, deletePlan} = planController;

const router = Router();

router.get('/', getPlans.bind(planController));
router.get('/:id', getPlan.bind(planController));
router.post('/', createPlan.bind(planController));
router.patch('/:id', updatePlan.bind(planController));
router.delete('/:id', deletePlan.bind(planController));

export default router;
