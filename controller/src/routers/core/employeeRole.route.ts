import {Router} from 'express';
import {employeeRoleController} from '../../controller/core';

const {getEmployeesRoles, getEmployeeRole, createEmployeeRole, updateEmployeeRole, deleteEmployeeRole} = employeeRoleController;

const router = Router();

router.get('/', getEmployeesRoles.bind(employeeRoleController));
router.get('/:id', getEmployeeRole.bind(employeeRoleController));
router.post('/', createEmployeeRole.bind(employeeRoleController));
router.patch('/:id', updateEmployeeRole.bind(employeeRoleController));
router.delete('/:id', deleteEmployeeRole.bind(employeeRoleController));

export default router;
