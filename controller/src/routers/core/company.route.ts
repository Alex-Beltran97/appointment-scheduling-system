import {Router} from 'express';
import {companyController} from '../../controller/core';

const {getCompanies, getCompany, createCompany, updateCompany, deleteCompany} = companyController;

const router = Router();

router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', createCompany);
router.patch('/:id', updateCompany);
router.delete('/:id', deleteCompany);

export default router;
