import { Request, Response } from "express";
import { AppSource } from "../../data";
import { ConsultantAvailability } from "../../models/consultants";
import { Profile } from "../../models/auth";
import { generateAvailableSlotsForConsultant } from "../../Services/generateAvailableSlotsForConsultant";

class ConsultantAvailabilityController {
  public async getAvailabilities(req: Request, res: Response): Promise<void> {
    try {
      const repo = AppSource.getRepository(ConsultantAvailability);
      const availabilities = await repo.find({
        relations: ['consultant']
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
        relations: ['consultant']
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
      const { consultant_id, weekday, start_time, end_time } = req.body;

      const profileRepo = AppSource.getRepository(Profile);
      const availabilityRepo = AppSource.getRepository(ConsultantAvailability);

      const consultant = await profileRepo.findOneBy({ id: consultant_id });
      if (!consultant) {
        res.status(404).json({ message: `Consultant with ID ${consultant_id} not found` });
        return;
      }

      const newAvailability = availabilityRepo.create({
        consultant,
        weekday,
        start_time,
        end_time
      });

      await availabilityRepo.save(newAvailability);

      await generateAvailableSlotsForConsultant(consultant.id);

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

      await generateAvailableSlotsForConsultant(availability.consultant.id);

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