import { Request, Response } from "express";
import { AppSource } from "../../data";
import { ConsultantException } from "../../models/consultants";
import { Profile } from "../../models/auth";

class ConsultantExceptionController {
  public async getExceptions(req: Request, res: Response): Promise<void> {
    try {
      const repo = AppSource.getRepository(ConsultantException);
      const exceptions = await repo.find({ relations: ['consultant'] });

      res.status(200).json({
        response: exceptions,
        message: 'Exceptions fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching exceptions:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getException(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(ConsultantException);
      const exception = await repo.findOne({
        where: { id },
        relations: ['consultant']
      });

      if (!exception) {
        res.status(404).json({ message: 'Exception not found' });
        return;
      }

      res.status(200).json({
        response: exception,
        message: 'Exception fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching exception:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createException(req: Request, res: Response): Promise<void> {
    try {
      const { consultant_id, date, start_time, end_time, reason } = req.body;

      const profileRepo = AppSource.getRepository(Profile);
      const exceptionRepo = AppSource.getRepository(ConsultantException);

      const consultant = await profileRepo.findOneBy({ id: consultant_id });
      if (!consultant) {
        res.status(404).json({ message: `Consultant with ID ${consultant_id} not found` });
        return;
      }

      const newException = exceptionRepo.create({
        consultant,
        date,
        start_time,
        end_time,
        reason
      });

      await exceptionRepo.save(newException);

      res.status(201).json({
        message: 'Exception created successfully'
      });
    } catch (error) {
      console.error('Error creating exception:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async updateException(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const { date, start_time, end_time, reason } = req.body;

      const repo = AppSource.getRepository(ConsultantException);
      const exception = await repo.findOneBy({ id });

      if (!exception) {
        res.status(404).json({ message: 'Exception not found' });
        return;
      }

      repo.merge(exception, { date, start_time, end_time, reason });
      await repo.save(exception);

      res.status(200).json({
        message: 'Exception updated successfully'
      });
    } catch (error) {
      console.error('Error updating exception:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async deleteException(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(ConsultantException);
      const exception = await repo.findOneBy({ id });

      if (!exception) {
        res.status(404).json({ message: 'Exception not found' });
        return;
      }

      await repo.remove(exception);

      res.status(200).json({
        message: 'Exception deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting exception:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new ConsultantExceptionController();