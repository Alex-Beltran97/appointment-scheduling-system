import {Router} from 'express';
import {profileController} from '../../controller/auth';

const {getProfiles, createProfile} = profileController;

const router = Router();

router.get('/', getProfiles);
router.post('/', createProfile);

export default router;
