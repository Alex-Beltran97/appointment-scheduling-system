import {Router} from 'express';
import {paymentStatusController} from '../../controller/core';

const {getPaymentStates, getPaymentStatus, createPaymentStatus, updatePaymentStatus, deletePaymentStatus} = paymentStatusController;

const router = Router();

router.get('/', getPaymentStates);
router.get('/:id', getPaymentStatus);
router.post('/', createPaymentStatus);
router.patch('/:id', updatePaymentStatus);
router.delete('/:id', deletePaymentStatus);

export default router;
