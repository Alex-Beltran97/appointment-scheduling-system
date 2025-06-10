import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Employee, EmployeeDTO } from '../../models/auth';

class EmployeeController {
  public async getEmployee(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Employee);
      const employees = await repo.find({
        relations: ['docType', 'employeeRole'],
      });

      const response = employees.map(EmployeeDTO.fromEntity);

      res.status(200).json({
        response,
        message: `Employee data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Employee data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new EmployeeController();