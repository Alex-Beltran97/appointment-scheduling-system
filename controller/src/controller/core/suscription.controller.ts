import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Payment, Suscription } from '../../models/core';
import { addDaysToDate } from '../../utils';

class SuscriptionController {
  public async getSuscriptions(req: Request, res: Response) : Promise<void> {
    const { disabled } = req.query;
    try {
      const disabledParsed = disabled && JSON.parse(disabled as string) ? true : false;

      const repo = AppSource.getRepository(Suscription);
      const response = await repo.find({
        where: { is_active: !disabledParsed },
        relations: ['payment', 'payment.paymnet_status', 'payment.company', 'payment.plan']
      });
      res.status(200).json({
        response,
        message: `Suscription data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Suscription data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async getSuscription(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Suscription);
      const response = await repo.findOne({
        where: { id },
        relations: ['payment', 'payment.paymnet_status', 'payment.company', 'payment.plan']
      });
      res.status(200).json({
        response,
        message: `Suscription data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Suscription data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async createSuscription(req: Request, res: Response) : Promise<void> {
    try {
      const { payment_id } = req.body;
      const repo = AppSource.getRepository(Suscription);
      const paymentRepo = AppSource.getRepository(Payment);

      const payment = await paymentRepo.findOne({
        where: { id: payment_id },
        relations: ['plan']
      });

      if (!payment) {
        res.status(404).json({ message: "Payment not found" });
        return;
      };

      const planDays = payment.plan.id === 2 ? 365 : 30;

      const newSuscription = repo.create({
        start_date: payment.payment_date,
        end_date: addDaysToDate(payment.payment_date, planDays), 
        payment
      });

      await repo.save(newSuscription);

      res.status(201).json({
        message: `Suscription created successfully`
      });
    } catch (error) {
      console.error(`Error fetching Suscription data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async deleteSuscription(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Suscription);

      const response = await repo.findOne({
        where: { id },
      });

      if (!response) {
        res.status(404).json({ message: "Suscription not found" });
        return;
      };

      repo.merge(response, { is_active: false });

      await repo.save(response);

      res.status(200).json({
        message: `Suscription disabled successfully`
      });
    } catch (error) {
      console.error(`Error fetching Suscription data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  
};

export default new SuscriptionController();