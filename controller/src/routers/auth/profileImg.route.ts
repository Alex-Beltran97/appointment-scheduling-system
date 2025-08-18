import {Router} from 'express';
import { profileImgController } from '../../controller/auth';
import { upload } from '../../middlewares/upload';

const {getImages, getImage, createImage, deleteImage} = profileImgController;

const router = Router();

router.get('/', getImages.bind(profileImgController));
router.get('/:id', getImage.bind(profileImgController));
router.post('/', upload.single('image'), createImage.bind(profileImgController));
router.delete('/:id', deleteImage.bind(profileImgController));

export default router;
