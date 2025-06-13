import {Router} from 'express';
import {suscriptionController} from '../../controller/core';

const {getSuscriptions, getSuscription, createSuscription, deleteSuscription} = suscriptionController;

const router = Router();

router.get('/', getSuscriptions);
router.get('/:id', getSuscription);
router.post('/', createSuscription);
router.delete('/:id', deleteSuscription);

export default router;
