import {Router} from 'express';
import {contractController} from '../../controller/core';

const {getContracts, getContract, createContract, updateContract, deleteContract} = contractController;

const router = Router();

router.get('/', getContracts);
router.get('/:id', getContract);
router.post('/', createContract);
router.patch('/:id', updateContract);
router.delete('/:id', deleteContract);

export default router;