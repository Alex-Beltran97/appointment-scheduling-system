import {Router} from 'express';
import {paymentController} from '../../controller/core';

const {getPayments, getPayment, createPayment} = paymentController;

const router = Router();

router.get('/', getPayments.bind(paymentController));
router.get('/:id', getPayment.bind(paymentController));
router.post('/', createPayment.bind(paymentController));

export default router;
