import {Router} from 'express';
import {employeeRoleController} from '../../controller/auth';

const {getEmployeesRoles} = employeeRoleController;

const router = Router();

router.get('/', getEmployeesRoles);

export default router;
