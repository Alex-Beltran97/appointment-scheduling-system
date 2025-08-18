import {Router} from 'express';
import {employeeController} from '../../controller/core';

const {getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee} = employeeController;

const router = Router();

router.get('/', getEmployees.bind(employeeController));
router.get('/:id', getEmployee.bind(employeeController));
router.post('/', createEmployee.bind (employeeController));
router.patch('/:id', updateEmployee.bind (employeeController));
router.delete('/:id', deleteEmployee.bind(employeeController));

export default router;