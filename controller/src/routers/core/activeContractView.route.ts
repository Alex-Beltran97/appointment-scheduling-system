import {Router} from 'express';
import {activeContractViewController} from '../../controller/core';

const {getActiveContracts} = activeContractViewController;

const router = Router();

router.get('/', getActiveContracts.bind(activeContractViewController));

export default router;
