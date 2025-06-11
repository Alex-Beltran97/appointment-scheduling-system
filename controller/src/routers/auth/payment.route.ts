import {Router} from 'express';
import {paymentController} from '../../controller/auth';

const {getPayments} = paymentController;

const router = Router();

router.get('/', getPayments);

export default router;
