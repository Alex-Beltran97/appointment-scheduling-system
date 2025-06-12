import {Router} from 'express';
import {employeeController} from '../../controller/core';

const {getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee} = employeeController;

const router = Router();

router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.post('/', createEmployee);
router.patch('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;