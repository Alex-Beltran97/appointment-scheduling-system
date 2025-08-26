import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { ActiveContractView } from '../../models/core/ActiveContractView/ActiveContractView';
import { parseString } from '../../utils';

class ActiveContractViewController {
  public async getActiveContracts(req: Request, res: Response): Promise<void> {
    const { companyNit } = req.query;

    try {
      const repo = AppSource.getRepository(ActiveContractView);
      const activeContracts = await repo.find({
        where: {
          ...(parseString(companyNit) ? {company_nit: parseString(companyNit)} : {})
        }
      });
      res.status(200).json({
        length: activeContracts?.length,
        response: activeContracts,
        message: `Active Contracts data fetched successfully`,
      });
    } catch (error) {
      console.error(`Error fetching Active Contracts:`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new ActiveContractViewController();
