import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { UserRole } from '../../models/core';

class UserRoleController {
  public async getRolesTypes(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(UserRole);
      const response = await repo.find({
        where: { is_active: true }
      });
      res.status(200).json({
        response,
        message: `User Role data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching User Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async getRoleType(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(UserRole);

      const response = await repo.findOne({
        where: { id, is_active: true }
      });

      if (!response) {
        res.status(404).json({ message: "User was not found" });
        return;
      };

      res.status(200).json({
        response,
        message: `User Role data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching User Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async createRoleType(req: Request, res: Response) : Promise<void> {
    try {
      const { name } = req.body;

      const repo = AppSource.getRepository(UserRole);

      const roles = await repo.find({
        where: { is_active: true }
      });

      const roleExists = roles.some(role => String(role.role).toLowerCase() === String(name).toLowerCase());
      
      if (roleExists) {
        res.status(400).json({ message: `Role with name ${name} already exists` });
        return;
      };

      const newRole = repo.create({ role: name });
      await repo.save(newRole);
      
      res.status(201).json({
        message: `User Role created successfully`
      });
    } catch (error) {
      console.error(`Error fetching User Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async updateRoleType(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const { name } = req.body;

      const repo = AppSource.getRepository(UserRole);

      const role = await repo.findOneBy({ id });

      if (!role) {
        res.status(404).json({ message: `User Role with id ${id} not found` });
        return;
      };

      repo.merge(role, { role: name });

      await repo.save(role);
      
      res.status(200).json({
        message: `User Role updated successfully`        
      });
    } catch (error) {
      console.error(`Error fetching User Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async deleteRoleType(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(UserRole);

      const role = await repo.findOneBy({ id });

      if (!role) {
        res.status(404).json({ message: `User Role with id ${id} not found` });
        return;
      };

      repo.merge(role, { is_active: false });

      await repo.save(role);
      
      res.status(200).json({
        message: `User Role deleted successfully`  
      });
    } catch (error) {
      console.error(`Error fetching User Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new UserRoleController();