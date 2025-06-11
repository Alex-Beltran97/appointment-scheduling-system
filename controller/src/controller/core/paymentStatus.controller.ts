import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { PaymentStatus } from '../../models/core';

class PaymentStatusController {
  public async getPaymentStates(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(PaymentStatus);
      const response = await repo.find();
      res.status(200).json({
        response,
        message: `Payment Status data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Payment Status data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new PaymentStatusController();