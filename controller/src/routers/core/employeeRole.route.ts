import {Router} from 'express';
import {employeeRoleController} from '../../controller/core';

const {getEmployeesRoles, getEmployeeRole, createEmployeeRole, updateEmployeeRole, deleteEmployeeRole} = employeeRoleController;

const router = Router();

router.get('/', getEmployeesRoles);
router.get('/:id', getEmployeeRole);
router.post('/', createEmployeeRole);
router.patch('/:id', updateEmployeeRole);
router.delete('/:id', deleteEmployeeRole);

export default router;
