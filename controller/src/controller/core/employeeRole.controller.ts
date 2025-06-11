import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { EmployeeRole } from '../../models/core';

class EmployeeRoleController {
  public async getEmployeesRoles(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(EmployeeRole);
      const employeesRoles = await repo.find();
      res.status(200).json({
        response: employeesRoles,
        message: `Employee role data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Employee role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new EmployeeRoleController();