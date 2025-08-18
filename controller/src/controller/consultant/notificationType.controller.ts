import { Request, Response } from "express";
import { AppSource } from "../../data";
import { NotificationType } from "../../models/consultants";

class NotificationTypeController {
  public async getNotificationTypes(req: Request, res: Response): Promise<void> {
    try {
      const repo = AppSource.getRepository(NotificationType);
      const types = await repo.find();
      res.status(200).json({ response: types, message: 'Notification types fetched successfully' });
    } catch (error) {
      console.error('Error fetching notification types:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getNotificationType(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(NotificationType);
      const type = await repo.findOne({ where: { id }, relations: ['notifications'] });

      if (!type) {
        res.status(404).json({ message: 'Notification type not found' });
        return;
      }

      res.status(200).json({ response: type, message: 'Notification type fetched successfully' });
    } catch (error) {
      console.error('Error fetching notification type:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createNotificationType(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body;

      const repo = AppSource.getRepository(NotificationType);
      const newType = repo.create({ status });

      await repo.save(newType);

      res.status(201).json({ response: newType, message: 'Notification type created successfully' });
    } catch (error) {
      console.error('Error creating notification type:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async updateNotificationType(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const { status } = req.body;

      const repo = AppSource.getRepository(NotificationType);
      const type = await repo.findOneBy({ id });

      if (!type) {
        res.status(404).json({ message: 'Notification type not found' });
        return;
      }

      repo.merge(type, { status });
      await repo.save(type);

      res.status(200).json({ response: type, message: 'Notification type updated successfully' });
    } catch (error) {
      console.error('Error updating notification type:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async deleteNotificationType(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(NotificationType);
      const type = await repo.findOneBy({ id });

      if (!type) {
        res.status(404).json({ message: 'Notification type not found' });
        return;
      }

      await repo.remove(type);
      res.status(200).json({ message: 'Notification type deleted successfully' });
    } catch (error) {
      console.error('Error deleting notification type:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new NotificationTypeController();
