import {Router} from 'express';
import {suscriptionController} from '../../controller/core';

const {getSuscriptions} = suscriptionController;

const router = Router();

router.get('/', getSuscriptions);

export default router;
