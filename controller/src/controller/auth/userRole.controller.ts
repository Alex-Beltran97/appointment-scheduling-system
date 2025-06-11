import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { UserRole } from '../../models/auth';

class UserRoleController {
  public async getRolesTypes(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(UserRole);
      const response = await repo.find();
      res.status(200).json({
        response,
        message: `User Role data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching User Role data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new UserRoleController();