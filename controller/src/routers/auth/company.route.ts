import {Router} from 'express';
import {companyController} from '../../controller/auth';

const {getCompanies} = companyController;

const router = Router();

router.get('/', getCompanies);

export default router;
