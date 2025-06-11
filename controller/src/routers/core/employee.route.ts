import {Router} from 'express';
import {employeeController} from '../../controller/core';

const {getEmployee} = employeeController;

const router = Router();

router.get('/', getEmployee);

export default router;