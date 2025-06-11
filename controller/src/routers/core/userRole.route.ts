import {Router} from 'express';
import {userRoleController} from '../../controller/core';

const {getRolesTypes, getRoleType, createRoleType, updateRoleType, deleteRoleType} = userRoleController;

const router = Router();

router.get('/', getRolesTypes);
router.get('/:id', getRoleType);
router.post('/', createRoleType);
router.patch('/:id', updateRoleType);
router.delete('/:id', deleteRoleType);

export default router;
