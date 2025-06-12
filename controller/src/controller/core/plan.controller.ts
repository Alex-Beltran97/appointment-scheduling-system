import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Plan } from '../../models/core';

class PlanController {
  public async getPlans(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Plan);
      const response = await repo.find({
        where: { is_active: true }
      });
      res.status(200).json({
        response,
        message: `Plan data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Plan data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async getPlan(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Plan);

      const response = await repo.findOne({
        where: { id, is_active: true }
      });

      if (!response) {
        res.status(404).json({ message: "Plan was not found" });
        return;
      };

      res.status(200).json({
        response,
        message: `Plan data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Plan data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async createPlan(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Plan);

      const newRole = repo.create(req.body);
      await repo.save(newRole);
      
      res.status(201).json({
        message: `User Role created successfully`
      });
    } catch (error) {
      console.error(`Error fetching User Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async updatePlan(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Plan);

      const plan = await repo.findOneBy({ id });

      if (!plan) {
        res.status(404).json({ message: `Plan with id ${id} not found` });
        return;
      };

      repo.merge(plan, req.body);

      await repo.save(plan);
      
      res.status(200).json({
        message: `Plan updated successfully`        
      });
    } catch (error) {
      console.error(`Error fetching Plan data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async deletePlan(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Plan);

      const plan = await repo.findOneBy({ id });

      if (!plan) {
        res.status(404).json({ message: `Plan with id ${id} not found` });
        return;
      };

      repo.merge(plan, { is_active: false });

      await repo.save(plan);
      
      res.status(200).json({
        message: `Plan deleted successfully`  
      });
    } catch (error) {
      console.error(`Error fetching Plan data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new PlanController();