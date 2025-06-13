import {Router} from 'express';
import {paymentController} from '../../controller/core';

const {getPayments, getPayment, createPayment} = paymentController;

const router = Router();

router.get('/', getPayments);
router.get('/:id', getPayment);
router.post('/', createPayment);

export default router;
