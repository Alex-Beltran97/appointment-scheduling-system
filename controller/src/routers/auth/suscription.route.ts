import {Router} from 'express';
import {suscriptionController} from '../../controller/auth';

const {getSuscriptions} = suscriptionController;

const router = Router();

router.get('/', getSuscriptions);

export default router;
