import {Router} from 'express';
import {paymentStatusController} from '../../controller/auth';

const {getPaymentStates} = paymentStatusController;

const router = Router();

router.get('/', getPaymentStates);

export default router;
