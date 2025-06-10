import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Plan } from '../../models/auth';

class PlanController {
  public async getPlans(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Plan);
      const response = await repo.find();
      res.status(200).json({
        response,
        message: `Plan data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Plan data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new PlanController();