import { Router } from 'express';
import { consultantExceptionController } from '../../controller/consultant';

const {getExceptions, getException, createException, updateException, deleteException} = consultantExceptionController;

const router = Router();

router.get('/', getExceptions.bind(consultantExceptionController));
router.get('/:id', getException.bind(consultantExceptionController));
router.post('/', createException.bind(consultantExceptionController));
router.patch('/:id', updateException.bind(consultantExceptionController));
router.delete('/:id', deleteException.bind(consultantExceptionController));

export default router;