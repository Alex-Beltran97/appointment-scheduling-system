import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Contract, DocType, Employee } from '../../models/auth';
import ContractDTO from '../../models/auth/Contract/ContractDTO';

class ContractController {
  public async getContracts(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Contract);
      const contracts = await repo.find({
        relations: ['company', 'employee','employee.docType', 'employee.employeeRole'],
      });

      const response = contracts.map(ContractDTO.fromEntity);

      res.status(200).json({
        response,
        message: `Contract data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching contract data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async createContract(req: Request, res: Response) : Promise<void> {
    try {
      const { company_id, employee_id, start_date } = req.body;
      
      const docTypeRepo = AppSource.getRepository(DocType);
      const employeeRepo = AppSource.getRepository(Employee);
      const repo = AppSource.getRepository(Contract);

      const company = await docTypeRepo.findOneBy({ id: company_id });
      const employee = await employeeRepo.findOneBy({ id: employee_id });

      if (!company) {
        res.status(404).json({ message: 'Company not found' });
        return;
      };

      if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      };

      const newContract = repo.create({ company, employee, start_date });
      await repo.save(newContract);

      res.status(201).json({
        message: `Contract data created successfully`
      });
    } catch (error) {
      console.error(`Error fetching contract data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new ContractController();