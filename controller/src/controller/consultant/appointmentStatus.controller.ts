// src/controllers/appointmentStatus.controller.ts
import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { AppointmentStatus } from '../../models/consultants';

class AppointmentStatusController {
  public async getAllStatuses(req: Request, res: Response): Promise<void> {
    try {
      const repo = AppSource.getRepository(AppointmentStatus);
      const response = await repo.find();
      res.status(200).json({
        response,
        message: 'Appointment statuses fetched successfully',
      });
    } catch (error) {
      console.error('Error fetching appointment statuses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    };
  }

  public async getStatusById(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    };

    try {
      const repo = AppSource.getRepository(AppointmentStatus);
      const response = await repo.findOneBy({ id });

      if (!response) {
        res.status(404).json({ message: 'Appointment status not found' });
        return;
      };

      res.status(200).json({
        response,
        message: 'Appointment status fetched successfully',
      });
    } catch (error) {
      console.error('Error fetching appointment status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body;

      const repo = AppSource.getRepository(AppointmentStatus);
      const existing = await repo.findOneBy({ status });

      if (existing) {
        res.status(400).json({ message: `Status '${status}' already exists` });
        return;
      };

      const newStatus = repo.create({ status });
      await repo.save(newStatus);

      res.status(201).json({
        message: 'Appointment status created successfully',
      });
    } catch (error) {
      console.error('Error creating appointment status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async updateStatus(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    };

    try {
      const { status } = req.body;

      const repo = AppSource.getRepository(AppointmentStatus);
      const existing = await repo.findOneBy({ id });

      if (!existing) {
        res.status(404).json({ message: `Appointment status with id ${id} not found` });
        return;
      }

      repo.merge(existing, { status });
      await repo.save(existing);

      res.status(200).json({
        message: 'Appointment status updated successfully',
      });
    } catch (error) {
      console.error('Error updating appointment status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async deleteStatus(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    };

    try {
      const repo = AppSource.getRepository(AppointmentStatus);
      const existing = await repo.findOneBy({ id });

      if (!existing) {
        res.status(404).json({ message: `Appointment status with id ${id} not found` });
        return;
      };

      await repo.remove(existing);

      res.status(200).json({
        message: 'Appointment status deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting appointment status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    };
  }
};

export default new AppointmentStatusController();
