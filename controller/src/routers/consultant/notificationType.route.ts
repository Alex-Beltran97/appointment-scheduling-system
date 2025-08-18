import { Router } from 'express';
import { notificationTypeController } from '../../controller/consultant';

const {getNotificationTypes, getNotificationType, createNotificationType, updateNotificationType, deleteNotificationType} = notificationTypeController;

const router = Router();

router.get('/', getNotificationTypes.bind(notificationTypeController));
router.get('/:id', getNotificationType.bind(notificationTypeController));
router.post('/', createNotificationType.bind(notificationTypeController));
router.patch('/:id', updateNotificationType.bind(notificationTypeController));
router.delete('/:id', deleteNotificationType.bind(notificationTypeController));

export default router;