import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Suscription } from '../../models/auth';

class SuscriptionController {
  public async getSuscriptions(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Suscription);
      const response = await repo.find();
      res.status(200).json({
        response,
        message: `Suscription data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Suscription data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new SuscriptionController();