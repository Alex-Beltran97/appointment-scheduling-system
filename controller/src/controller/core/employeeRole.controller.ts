import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { EmployeeRole } from '../../models/core';

class EmployeeRoleController {
  public async getEmployeesRoles(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(EmployeeRole);
      const employeesRoles = await repo.find({
        where: { is_active: true }
      });
      res.status(200).json({
        response: employeesRoles,
        message: `Employee role data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Employee role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async getEmployeeRole(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(EmployeeRole);

      const response = await repo.findOne({
        where: { id, is_active: true }
      });

      if (!response) {
        res.status(404).json({ message: "Employee Role was not found" });
        return;
      };

      res.status(200).json({
        response,
        message: `Employee Role data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Employee Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async createEmployeeRole(req: Request, res: Response) : Promise<void> {
    try {
      const { name } = req.body;

      const repo = AppSource.getRepository(EmployeeRole);

      const roles = await repo.find({
        where: { is_active: true }
      });

      const roleExists = roles.some(role => String(role.employeeRole).toLowerCase() === String(name).toLowerCase());
      
      if (roleExists) {
        res.status(400).json({ message: `Employee Role with name ${name} already exists` });
        return;
      };

      const newRole = repo.create({ employeeRole: name });
      await repo.save(newRole);
      
      res.status(201).json({
        message: `Employee Role created successfully`
      });
    } catch (error) {
      console.error(`Error fetching Employee Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async updateEmployeeRole(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const { name } = req.body;

      const repo = AppSource.getRepository(EmployeeRole);

      const role = await repo.findOneBy({ id });

      if (!role) {
        res.status(404).json({ message: `Employee Role with id ${id} not found` });
        return;
      };

      repo.merge(role, { employeeRole: name });

      await repo.save(role);
      
      res.status(200).json({
        message: `Employee Role updated successfully`        
      });
    } catch (error) {
      console.error(`Error fetching Employee Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async deleteEmployeeRole(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(EmployeeRole);

      const role = await repo.findOneBy({ id });

      if (!role) {
        res.status(404).json({ message: `Employee Role with id ${id} not found` });
        return;
      };

      repo.merge(role, { is_active: false });

      await repo.save(role);
      
      res.status(200).json({
        message: `Employee Role deleted successfully`  
      });
    } catch (error) {
      console.error(`Error fetching Employee Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new EmployeeRoleController();