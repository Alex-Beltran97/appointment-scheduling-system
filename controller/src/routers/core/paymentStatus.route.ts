import {Router} from 'express';
import {paymentStatusController} from '../../controller/core';

const {getPaymentStates, getPaymentStatus, createPaymentStatus, updatePaymentStatus, deletePaymentStatus} = paymentStatusController;

const router = Router();

router.get('/', getPaymentStates.bind(paymentStatusController));
router.get('/:id', getPaymentStatus.bind(paymentStatusController));
router.post('/', createPaymentStatus.bind(paymentStatusController));
router.patch('/:id', updatePaymentStatus.bind(paymentStatusController));
router.delete('/:id', deletePaymentStatus.bind(paymentStatusController));

export default router;
