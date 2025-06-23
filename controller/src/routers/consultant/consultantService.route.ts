import { Router } from 'express';
import {serviceController} from '../../controller/consultant';

const {getServices, getService, createService, updateService, deleteService} = serviceController;

const router = Router();

router.get('/', getServices.bind(serviceController));
router.get('/:id', getService.bind(serviceController));
router.post('/', createService.bind(serviceController));
router.patch('/:id', updateService.bind(serviceController));
router.delete('/:id', deleteService.bind(serviceController));

export default router;