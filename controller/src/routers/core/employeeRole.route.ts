import {Router} from 'express';
import {employeeRoleController} from '../../controller/core';

const {getEmployeesRoles} = employeeRoleController;

const router = Router();

router.get('/', getEmployeesRoles);

export default router;
