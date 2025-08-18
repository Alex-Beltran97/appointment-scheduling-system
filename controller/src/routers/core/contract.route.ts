import {Router} from 'express';
import {contractController} from '../../controller/core';

const {getContracts, getContract, createContract, updateContract, deleteContract} = contractController;

const router = Router();

router.get('/', getContracts.bind(contractController));
router.get('/:id', getContract.bind(contractController));
router.post('/', createContract.bind(contractController));
router.patch('/:id', updateContract.bind(contractController));
router.delete('/:id', deleteContract.bind(contractController));

export default router;