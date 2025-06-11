import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { DocType } from '../../models/core';

class DocTypeController {
  public async getdocTypes(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(DocType);
      const companies = await repo.find();
      res.status(200).json({
        response: companies,
        message: `Doc type data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Doc type data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new DocTypeController();