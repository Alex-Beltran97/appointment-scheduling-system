import {Router} from 'express';
import {profileController} from '../../controller/core';

const {getProfiles, getProfile, createProfile, loginProfile, updateProfile, deleteProfile} = profileController;

const router = Router();

router.get('/', getProfiles);
router.get('/:id', getProfile);
router.post('/', createProfile);
router.post('/login', loginProfile);
router.patch('/:id', updateProfile);
router.delete('/:id', deleteProfile);

export default router;
