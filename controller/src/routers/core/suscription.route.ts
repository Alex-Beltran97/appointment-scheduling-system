import {Router} from 'express';
import {suscriptionController} from '../../controller/core';

const {getSuscriptions, getSuscription, createSuscription, deleteSuscription} = suscriptionController;

const router = Router();

router.get('/', getSuscriptions.bind(suscriptionController));
router.get('/:id', getSuscription.bind(suscriptionController));
router.post('/', createSuscription.bind(suscriptionController));
router.delete('/:id', deleteSuscription.bind(suscriptionController));

export default router;