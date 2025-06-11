import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { Company } from '../../models/core/Company/Company';

class CompanyController {
  public async getCompanies(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Company);
      const companies = await repo.find();
      res.status(200).json({
        response: companies,
        message: `Company data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Company data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new CompanyController();