import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Company } from '../../models/core/Company/Company';

class CompanyController {
  public async getCompanies(req: Request, res: Response) : Promise<void> {
    const { nit_code } = req?.query;

    const _nit_code = String(nit_code)?.trim();
    let _nit_codeQuery = {};

    if (_nit_code && _nit_code !== 'undefined' && _nit_code !== null && _nit_code !== 'null') {
      _nit_codeQuery = {nit_code: _nit_code};
    };

    try {
      const repo = AppSource.getRepository(Company);
      const companies = await repo.find({
        where: { 
          is_active: true,
          ..._nit_codeQuery
        },
      });
      res.status(200).json({
        length: companies?.length,
        response: companies,
        message: `Company data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Company data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async getCompany(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Company);

      const response = await repo.findOne({
        where: { id, is_active: true }
      });

      if (!response) {
        res.status(404).json({ message: "Company was not found" });
        return;
      };

      res.status(200).json({
        response,
        message: `Company data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Company data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async createCompany(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Company);

      const newCompany = repo.create(req.body);
      await repo.save(newCompany);
      
      res.status(201).json({
        message: `Company created successfully`
      });
    } catch (error) {
      console.error(`Error fetching Company data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async updateCompany(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Company);

      const company = await repo.findOneBy({ id });

      if (!company) {
        res.status(404).json({ message: `Company with id ${id} not found` });
        return;
      };

      repo.merge(company, req.body);

      await repo.save(company);
      
      res.status(200).json({
        message: `Company updated successfully`        
      });
    } catch (error) {
      console.error(`Error fetching Company data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async deleteCompany(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Company);

      const company = await repo.findOneBy({ id });

      if (!company) {
        res.status(404).json({ message: `Company with id ${id} not found` });
        return;
      };

      repo.merge(company, { is_active: false });

      await repo.save(company);
      
      res.status(200).json({
        message: `Company deleted successfully`  
      });
    } catch (error) {
      console.error(`Error fetching Company data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new CompanyController();