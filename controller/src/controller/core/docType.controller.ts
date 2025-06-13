import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { DocType } from '../../models/core';

class DocTypeController {
  public async getdocTypes(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(DocType);
      const response = await repo.find();
      res.status(200).json({
        response,
        message: `Doc type data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Doc type data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async getdocType(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };
    
    try {
      const repo = AppSource.getRepository(DocType);
      const response = await repo.findOneBy({id});

      if (!response) {
        res.status(404).json({ message: "User was not found" });
        return;
      };

      res.status(200).json({
        response,
        message: `Doc type data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Doc type data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async createdocType(req: Request, res: Response) : Promise<void> {
    try {
      const { name } = req.body;

      const repo = AppSource.getRepository(DocType);

      const docTypes = await repo.find();

      const docTypeExists = docTypes.some(docType => String(docType.docType).toLowerCase() === String(name).toLowerCase());
      
      if (docTypeExists) {
        res.status(400).json({ message: `Doc Type with name ${name} already exists` });
        return;
      };
      
      const newDocType = repo.create({ docType: name });
      await repo.save(newDocType);

      res.status(201).json({
        message: `Doc type data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Doc type data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async updateDocType(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const { name } = req.body;

      const repo = AppSource.getRepository(DocType);

      const docType = await repo.findOneBy({ id });

      if (!docType) {
        res.status(404).json({ message: `Doc Type with id ${id} not found` });
        return;
      };

      repo.merge(docType, { docType: name });

      await repo.save(docType);
      
      res.status(200).json({
        message: `Doc Type updated successfully`        
      });
    } catch (error) {
      console.error(`Error fetching Doc Type data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async deleteRoleType(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(DocType);
      const result = await repo.delete(id);

      if (result.affected === 0) {
        res.status(404).json({ message: "Doc Type not found" });
        return;
      };

      res.json({ message: "Doc Type deleted successfully" });
    } catch (error) {
      console.error(`Error fetching Doc Type data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new DocTypeController();