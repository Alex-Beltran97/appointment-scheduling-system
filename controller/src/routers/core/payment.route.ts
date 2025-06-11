import {Router} from 'express';
import {paymentController} from '../../controller/core';

const {getPayments} = paymentController;

const router = Router();

router.get('/', getPayments);

export default router;
