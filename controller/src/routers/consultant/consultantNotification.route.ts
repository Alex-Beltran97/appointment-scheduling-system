import { Router } from 'express';
import { consultantNotificationController } from '../../controller/consultant';

const {getUnreadNotifications, createNotification, markAllAsRead} = consultantNotificationController;

const router = Router();

router.get('/unread/:consultantId', getUnreadNotifications.bind(consultantNotificationController));
router.post('/', createNotification.bind(consultantNotificationController));
router.post('/mark-as-read/:consultantId', markAllAsRead.bind(consultantNotificationController));

export default router;