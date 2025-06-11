import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Payment } from '../../models/auth';

class PaymentController {
  public async getPayments(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Payment);
      const response = await repo.find({
        relations: ['paymnet_status', 'suscription', 'suscription.company', 'suscription.plan']
      });
      res.status(200).json({
        response,
        message: `Payments data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Payments data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new PaymentController();