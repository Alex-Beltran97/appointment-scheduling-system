import {Router} from 'express';
import {companyController} from '../../controller/core';

const {getCompanies, getCompany, createCompany, updateCompany, deleteCompany} = companyController;

const router = Router();

router.get('/', getCompanies.bind(companyController));
router.get('/:id', getCompany.bind(companyController));
router.post('/', createCompany.bind(companyController));
router.patch('/:id', updateCompany.bind(companyController));
router.delete('/:id', deleteCompany.bind(companyController));

export default router;
