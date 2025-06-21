import {Router} from 'express';
import {profileController} from '../../controller/core';

const {getProfiles, getProfile, createProfile, loginProfile, logoutProfile, verifySession, updateProfile, deleteProfile} = profileController;

const router = Router();

router.get('/', getProfiles.bind(profileController));
router.get('/:id', getProfile.bind(profileController));
router.post('/', createProfile.bind(profileController));
router.get('/login', verifySession.bind(profileController));
router.post('/login', loginProfile.bind(profileController));
router.post('/logout', logoutProfile.bind(profileController));
router.patch('/:id', updateProfile.bind(profileController));
router.delete('/:id', deleteProfile.bind(profileController));

export default router;
