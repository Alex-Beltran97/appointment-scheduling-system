import { Request, Response } from "express";
import { AppSource } from "../../data";
import { ConsultantAvailability, ConsultantService } from "../../models/consultants";
import { Profile } from "../../models/auth";
import { generateAvailableSlotsForServices } from "../../Services/generateAvailableSlotsForServices";

class ConsultantAvailabilityController {
  public async getAvailabilities(req: Request, res: Response): Promise<void> {
    const {service_id} = req.query;

    try {

      const filters: any = {};

      const repo = AppSource.getRepository(ConsultantAvailability);

      if (service_id && service_id !== 'null' && service_id !== 'undefined') {
        filters.service = { id: +service_id };
      }

      const availabilities = await repo.find({
        where: {...filters},
        relations: ['service'],
        order: { weekday: 'ASC', start_time: 'ASC' }
      });

      res.status(200).json({
        response: availabilities,
        message: 'Availabilities fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getAvailability(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(ConsultantAvailability);
      const availability = await repo.findOne({
        where: { id },
        relations: ['service']
      });

      if (!availability) {
        res.status(404).json({ message: 'Availability not found' });
        return;
      }

      res.status(200).json({
        response: availability,
        message: 'Availability fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching availability:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createAvailability(req: Request, res: Response): Promise<void> {
    try {
      const { service_id, weekday, start_time, end_time } = req.body;

      const serviceRepo = AppSource.getRepository(ConsultantService);
      const availabilityRepo = AppSource.getRepository(ConsultantAvailability);

      const service = await serviceRepo.findOne({
        where: { id: service_id },
        relations: ['consultant']
      });

      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }

      const newAvailability = availabilityRepo.create({
        service,
        weekday,
        start_time,
        end_time
      });

      await availabilityRepo.save(newAvailability);

      await generateAvailableSlotsForServices()

      res.status(201).json({
        message: 'Availability created and slots generated successfully'
      });
    } catch (error) {
      console.error('Error creating availability:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async updateAvailablity(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const { weekday, start_time, end_time } = req.body;

      const repo = AppSource.getRepository(ConsultantAvailability);
      const availability = await repo.findOneBy({ id });

      if (!availability) {
        res.status(404).json({ message: 'Availability not found' });
        return;
      }

      repo.merge(availability, { weekday, start_time, end_time });
      await repo.save(availability);

      await generateAvailableSlotsForServices();

      res.status(200).json({
        message: 'Availability updated and slots regenerated successfully'
      });
    } catch (error) {
      console.error('Error updating availability:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async deleteAvailablity(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(ConsultantAvailability);
      const availability = await repo.findOneBy({ id });

      if (!availability) {
        res.status(404).json({ message: 'Availability not found' });
        return;
      }

      await repo.remove(availability);

      res.status(200).json({
        message: 'Availability deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting availability:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new ConsultantAvailabilityController();