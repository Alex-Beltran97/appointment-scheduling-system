import {Router} from 'express';
import {profileController} from '../../controller/core';

const {getProfiles, createProfile} = profileController;

const router = Router();

router.get('/', getProfiles);
router.post('/', createProfile);

export default router;
