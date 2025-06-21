import { Router } from 'express';
import loginController from '../../controller/auth/login.controller';

const router = Router();

const {loginProfile, logoutProfile, verifySession} = loginController;

router.get('/', verifySession.bind(loginController));
router.post('/', loginProfile.bind(loginController));
router.post('/logout', logoutProfile.bind(loginController));

export default router;