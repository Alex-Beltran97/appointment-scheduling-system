import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { PaymentStatus } from '../../models/core';

class PaymentStatusController {
  public async getPaymentStates(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(PaymentStatus);
      const response = await repo.find({
        where: { is_active: true }
      });
      res.status(200).json({
        response,
        message: `Payment Status data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Payment Status data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async getPaymentStatus(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(PaymentStatus);

      const response = await repo.findOne({
        where: { id, is_active: true }
      });

      if (!response) {
        res.status(404).json({ message: "Payment Status was not found" });
        return;
      };

      res.status(200).json({
        response,
        message: `Payment Status data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Payment Status data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async createPaymentStatus(req: Request, res: Response) : Promise<void> {
    try {
      const { name } = req.body;

      const repo = AppSource.getRepository(PaymentStatus);

      const states = await repo.find({
        where: { is_active: true }
      });

      const statusExists = states.some(status => String(status.status).toLowerCase() === String(name).toLowerCase());
      
      if (statusExists) {
        res.status(400).json({ message: `Status with name ${name} already exists` });
        return;
      };

      const newPaymentStatus = repo.create({status: name});
      await repo.save(newPaymentStatus);
      
      res.status(201).json({
        message: `Payment Status created successfully`
      });
    } catch (error) {
      console.error(`Error fetching Payment Status data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async updatePaymentStatus(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const { name } = req.body;

      const repo = AppSource.getRepository(PaymentStatus);

      const paymentStatus = await repo.findOneBy({ id });

      if (!paymentStatus) {
        res.status(404).json({ message: `Payment Status with id ${id} not found` });
        return;
      };

      repo.merge(paymentStatus, { status: name });

      await repo.save(paymentStatus);
      
      res.status(200).json({
        message: `Payment Status updated successfully`        
      });
    } catch (error) {
      console.error(`Error fetching Payment Status data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async deletePaymentStatus(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(PaymentStatus);

      const paymentStatus = await repo.findOneBy({ id });

      if (!paymentStatus) {
        res.status(404).json({ message: `Payment Status with id ${id} not found` });
        return;
      };

      repo.merge(paymentStatus, { is_active: false });

      await repo.save(paymentStatus);
      
      res.status(200).json({
        message: `Payment Status deleted successfully`  
      });
    } catch (error) {
      console.error(`Error fetching Payment Status data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new PaymentStatusController();