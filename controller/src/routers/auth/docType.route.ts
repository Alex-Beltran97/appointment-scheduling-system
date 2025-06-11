import {Router} from 'express';
import {docTypeController} from '../../controller/auth';

const {getdocTypes} = docTypeController;

const router = Router();

router.get('/', getdocTypes);

export default router;
