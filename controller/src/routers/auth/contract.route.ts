import {Router} from 'express';
import {contractController} from '../../controller/auth';

const {getContracts, createContract} = contractController;

const router = Router();

router.get('/', getContracts);
router.post('/', createContract);

export default router;