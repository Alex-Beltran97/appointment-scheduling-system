import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Company, Contract, DocType, Employee } from '../../models/core';
import ContractDTO from '../../models/core/Contract/ContractDTO';

class ContractController {
  public async getContracts(req: Request, res: Response) : Promise<void> {
    const {ended_contracts} = req.query || {};
    
    const withEndedContracts = ended_contracts && JSON?.parse(String(ended_contracts)) ? true : false;

    try {
      const repo = AppSource.getRepository(Contract);
      const contracts = await repo.find({
        relations: ['company', 'employee','employee.docType', 'employee.employeeRole'],
        where: {is_active: !withEndedContracts}
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

  public async getContract(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Contract);

      const contract = await repo.findOne({
        relations: ['company', 'employee','employee.docType', 'employee.employeeRole'],
      });

      if (!contract) {
        res.status(404).json({ message: "Contract was not found" });
        return;
      };

      const response = ContractDTO.fromEntity(contract!);

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
      const { company_id, employee_id, start_date, end_date } = req.body;
      
      const companyRepo = AppSource.getRepository(Company);
      const employeeRepo = AppSource.getRepository(Employee);
      const repo = AppSource.getRepository(Contract);

      const company = await companyRepo.findOneBy({ id: company_id });
      const employee = await employeeRepo.findOneBy({ id: employee_id });

      if (!company) {
        res.status(404).json({ message: 'Company not found' });
        return;
      };

      if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      };

      const newContract = repo.create({ company, employee, start_date, end_date });
      await repo.save(newContract);

      res.status(201).json({
        message: `Contract data created successfully`
      });
    } catch (error) {
      console.error(`Error fetching contract data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async updateContract(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      let company, employee;

      const { company_id, employee_id, start_date, end_date } = req.body;
      
      const companyRepo = AppSource.getRepository(Company);
      const employeeRepo = AppSource.getRepository(Employee);
      const repo = AppSource.getRepository(Contract);

      const contract = await repo.findOneBy({ id });
      
      if (company_id) {
        company = await companyRepo.findOneBy({ id: company_id });
        if (!company) {
          res.status(404).json({ message: 'Company not found' });
          return;
        };
      };
      
      if (employee_id) {
        employee = await employeeRepo.findOneBy({ id: employee_id });
        if (!employee) {
          res.status(404).json({ message: 'Employee not found' });
          return;
        };
      };

      if (!contract) {
        res.status(404).json({ message: `Contract with id ${id} not found` });
        return;
      };

      repo.merge(contract, {
        ...(company && { company }),
        ...(employee && { employee }),
        start_date,
        end_date
      });
      
      await repo.save(contract);

      res.status(200).json({
        message: `Contract data updated successfully`        
      });
    } catch (error) {
      console.error(`Error fetching contract data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async deleteContract(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {      
      const repo = AppSource.getRepository(Contract);
      const contract = await repo.findOneBy({ id });

      if (!contract) {
        res.status(404).json({ message: `Contract with id ${id} not found` });
        return;
      };

      repo.merge(contract, { is_active: false, end_date: new Date() });
      await repo.save(contract);

      res.status(200).json({
        message: `Contract data updated successfully`        
      });
    } catch (error) {
      console.error(`Error fetching contract data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new ContractController();