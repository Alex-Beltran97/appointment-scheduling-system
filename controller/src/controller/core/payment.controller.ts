import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Company, Payment, PaymentStatus, Plan } from '../../models/core';

class PaymentController {
  public async getPayments(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Payment);
      const response = await repo.find({
        relations: ['paymnet_status', 'company', 'plan', 'suscriptions']
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
  
  public async getPayment(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Payment);
      const response = await repo.findOne({
        where: { id },
        relations: ['paymnet_status', 'company', 'plan', 'suscriptions']
      });

      if (!response) {
        res.status(404).json({ message: "Payment was not found" });
        return;
      };

      res.status(200).json({
        response,
        message: `Payments data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Payments data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async createPayment(req: Request, res: Response) : Promise<void> {
    try {
      const { company_id, plan_id, amount } = req.body;  

      const repo = AppSource.getRepository(Payment);
      const paymentStatusRepo = AppSource.getRepository(PaymentStatus);
      const companyRepo = AppSource.getRepository(Company);
      const planRepo = AppSource.getRepository(Plan);
      
      

      const company = await companyRepo.findOne({
        where: { id: company_id, is_active: true }
      });

      const plan = await planRepo.findOne({
        where: { id: plan_id, is_active: true }
      });

      

      if (!company) {
        res.status(404).json({ message: "Company not found" });
        return;
      };
      
      if (!plan) {
        res.status(404).json({ message: "Plan not found" });
        return;
      };

      if (isNaN(amount) || amount <= 0) {
        res.status(400).json({ message: "Invalid amount" });
        return;
      };

      const isDifferentAmount = plan?.price !== amount;

      const paymentStatus = await paymentStatusRepo.findOne({
        where: { id: isDifferentAmount ? 2 : 1, is_active: true }
      });      

      if (!paymentStatus) {
        res.status(404).json({ message: "Payment Status not found" });
        return;
      };

      const newPayment = repo.create({
        paymnet_status: paymentStatus,
        company,
        plan,
        amount
      });

      await repo.save(newPayment);

      res.status(201).json({
        message: `Payments data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Payments data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new PaymentController();