import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { DocType, Employee, EmployeeDTO, EmployeeRole } from '../../models/core';

class EmployeeController {
  public async getEmployees(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Employee);
      const employees = await repo.find({
        relations: ['docType', 'employeeRole', 'constracts', 'constracts.company'],
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

  public async getEmployee(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Employee);

      const response = await repo.findOneBy({id});

      if (!response) {
        res.status(404).json({ message: "Employee was not found" });
        return;
      };

      res.status(200).json({
        response,
        message: `Employee data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Employee data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async createEmployee(req: Request, res: Response) : Promise<void> {
    try {

      const { docType_id, employeeRole_id } = req.body;

      const repo = AppSource.getRepository(Employee);
      const docTypeRepo = AppSource.getRepository(DocType);
      const employeeRoleRepo = AppSource.getRepository(EmployeeRole);

      const docType = await docTypeRepo.findOneBy({ id: docType_id });
      const employeeRole = await employeeRoleRepo.findOneBy({ id: employeeRole_id });

      if (!docType) {
        res.status(404).json({ message: `Doc Type with id ${docType_id} not found` });
        return;
      };

      if (!employeeRole) {
        res.status(404).json({ message: `Employee Role with id ${employeeRole_id} not found` });
        return;
      };

      const newEmployee = repo.create({...req.body, docType, employeeRole});
      await repo.save(newEmployee);
      
      res.status(201).json({
        message: `Employee created successfully`
      });
    } catch (error) {
      console.error(`Error fetching Employee data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async updateEmployee(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const { docType_id, employeeRole_id } = req.body;

      const repo = AppSource.getRepository(Employee);
      const docTypeRepo = AppSource.getRepository(DocType);
      const employeeRoleRepo = AppSource.getRepository(EmployeeRole);

      const docType = await docTypeRepo.findOneBy({ id: docType_id });
      const employeeRole = await employeeRoleRepo.findOneBy({ id: employeeRole_id });
      const employee = await repo.findOneBy({ id });

      if (!docType) {
        res.status(404).json({ message: `Doc Type with id ${docType_id} not found` });
        return;
      };

      if (!employeeRole) {
        res.status(404).json({ message: `Employee Role with id ${employeeRole_id} not found` });
        return;
      };

      if (!employee) {
        res.status(404).json({ message: `Employee with id ${id} not found` });
        return;
      };

      repo.merge(employee, {...req.body, docType, employeeRole});

      await repo.save(employee);
      
      res.status(200).json({
        message: `Employee updated successfully`        
      });
    } catch (error) {
      console.error(`Error fetching Employee data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async deleteEmployee(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Employee);
      const result = await repo.delete(id);

      if (result.affected === 0) {
        res.status(404).json({ message: "Employee not found" });
        return;
      };

      res.json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error(`Error fetching Employee data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new EmployeeController();