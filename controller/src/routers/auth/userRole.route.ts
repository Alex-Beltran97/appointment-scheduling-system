import {Router} from 'express';
import {userRoleController} from '../../controller/core';

const {getRolesTypes, getRoleType, createRoleType, updateRoleType, deleteRoleType} = userRoleController;

const router = Router();

router.get('/', getRolesTypes.bind(userRoleController));
router.get('/:id', getRoleType.bind(userRoleController));
router.post('/', createRoleType.bind(userRoleController));
router.patch('/:id', updateRoleType.bind(userRoleController));
router.delete('/:id', deleteRoleType.bind(userRoleController));

export default router;
