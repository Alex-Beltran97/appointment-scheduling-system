import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { ConsultantService } from '../../models/consultants/ConsultantService/ConsultantService';
import { Profile } from '../../models/auth/Profile/Profile';
import { generateAvailableSlotsForServices } from '../../Services/generateAvailableSlotsForServices';
import moment from 'moment';
import { Between } from 'typeorm';

class ServiceController {
  public async getServices(req: Request, res: Response): Promise<void> {
    const { consultant_id, year } = req.query;

    const formattedYear = +year!; 
    const startYear = moment.utc(`${formattedYear}-01-01`).toDate();
    const endYear = moment.utc(`${formattedYear + 1}-01-01`).toDate();
    
    let dateCondition = {};

    if (year && !isNaN(new Date(String(year)).getFullYear())) {
      dateCondition = { created_at: Between(startYear, endYear) };
    };

    try {
      const repo = AppSource.getRepository(ConsultantService);
      const services = await repo.find({
        where: { 
          is_active: true,
          ...(consultant_id && !isNaN(+consultant_id) ? { consultant: { id: +consultant_id } } : {}),
          ...dateCondition,
        },
        relations: ['consultant']
      });

      res.status(200).json({
        lenght: services?.length,
        response: services,
        message: 'Services fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getService(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(ConsultantService);
      const service = await repo.findOne({
        where: { id, is_active: true },
        relations: ['consultant', "consultantAvailabilities"]
      });

      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }

      res.status(200).json({
        response: service,
        message: 'Service fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching service:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createService(req: Request, res: Response): Promise<void> {
    try {
      const {
        consultant_id,
        name,
        description,
        durationMinutes,
        price
      } = req.body;

      const serviceRepo = AppSource.getRepository(ConsultantService);
      const profileRepo = AppSource.getRepository(Profile);

      const consultant = await profileRepo.findOneBy({ id: consultant_id });
      if (!consultant) {
        res.status(404).json({ message: `Consultant with ID ${consultant_id} not found` });
        return;
      }

      const newService = serviceRepo.create({
        consultant,
        name,
        description,
        durationMinutes,
        price,
        is_active: true
      });

      await serviceRepo.save(newService);

      await generateAvailableSlotsForServices()

      res.status(201).json({
        response: newService,
        message: 'Service created and available slots generated successfully'
      });
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async updateService(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const {
        name,
        description,
        durationMinutes,
        price
      } = req.body;

      const repo = AppSource.getRepository(ConsultantService);
      const service = await repo.findOne({
        where: { id, is_active: true },
        relations: ['consultant', 'consultantAvailabilities']
      });

      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }

      repo.merge(service, {
        name,
        description,
        durationMinutes,
        price
      });

      await repo.save(service);

      await generateAvailableSlotsForServices();

      res.status(200).json({
        response: service,
        message: 'Service updated successfully'
      });
    } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async deleteService(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(ConsultantService);
      const service = await repo.findOneBy({ id });

      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }

      repo.merge(service, { is_active: false });
      await repo.save(service);

      res.status(200).json({
        message: 'Service deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new ServiceController();
