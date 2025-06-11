import {Router} from 'express';
import {employeeController} from '../../controller/auth';

const {getEmployee} = employeeController;

const router = Router();

router.get('/', getEmployee);

export default router;