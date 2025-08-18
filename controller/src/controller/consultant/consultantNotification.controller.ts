import { Request, Response } from "express";
import { AppSource } from "../../data";
import { ConsultantNotification } from "../../models/consultants";

class ConsultantNotificationController {
  async getUnreadNotifications(req: Request, res: Response) {
    const { consultant_id } = req.query;

    try {
      const repo = AppSource.getRepository(ConsultantNotification);
      const notifications = await repo.find({
        where: {
          ...(consultant_id && !isNaN(+consultant_id) ? { consultant: { id: +consultant_id } } : {}),
          is_readed: false,
        },
        relations: ['consultant', 'notificationType'],
        order: { created_at: 'DESC' }
      });

      res.json(notifications);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving unread notifications' });
    }
  }

  async createNotification(req: Request, res: Response) {
    const { consultantId, notificationTypeId, message } = req.body;
    try {
      const repo = AppSource.getRepository(ConsultantNotification);
      const notification = repo.create({
        consultant: { id: consultantId },
        notificationType: { id: notificationTypeId },
        message,
        is_readed: false,
      });

      const saved = await repo.save(notification);
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: 'Error creating notification' });
    }
  }

  async markAllAsRead(req: Request, res: Response) {
    const consultantId = parseInt(req.params.consultantId);
    try {
      const repo = AppSource.getRepository(ConsultantNotification);
      await repo.update(
        { consultant: { id: consultantId }, is_readed: false },
        { is_readed: true }
      );
      res.status(200).json({ message: 'Notifications marked as read' });
    } catch (err) {
      res.status(500).json({ message: 'Error marking notifications as read' });
    }
  }
};

export default new ConsultantNotificationController();