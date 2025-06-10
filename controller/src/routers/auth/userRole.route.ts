import {Router} from 'express';
import {userRoleController} from '../../controller/auth';

const {getRolesTypes} = userRoleController;

const router = Router();

router.get('/', getRolesTypes);

export default router;
