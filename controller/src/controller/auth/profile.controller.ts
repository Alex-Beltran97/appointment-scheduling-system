import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { DocType, Profile, UserRole } from '../../models/auth';
import ProfileDTO from '../../models/auth/Profile/ProfileDTO';

class ProfileController {
  public async getProfiles(req: Request, res: Response) : Promise<void> {
    try {
      const repo = AppSource.getRepository(Profile);
      const response = await repo.find({
        relations: ['userRole', 'docType']
      });

      const profiles = response.map(ProfileDTO.fromEntity);

      res.status(200).json({
        response: profiles,
        message: `Profile data fetched successfully`
      });
    } catch (error) {
      console.error(`Error fetching Profile data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async createProfile(req: Request, res: Response) : Promise<void> {
    try {

      const {
        userRole_id,
        name,
        lastName,
        secondLastName,
        birthDate,
        phone,
        countryCode,
        cityCode,
        email,
        docType_id,
        docNum,
        nitCode,
        employeeCode,
        username,
        password
      } = req.body;

      const repo = AppSource.getRepository(Profile);
      const userRolerepo = AppSource.getRepository(UserRole);
      const docTyperepo = AppSource.getRepository(DocType);

      const userRole = await userRolerepo.findOneBy({ id: userRole_id });
      const docType = await docTyperepo.findOneBy({ id: docType_id });

      if (!userRole) {
        res.status(404).json({
          message: `User Role with id ${userRole_id} not found`
        });
        return;
      };
      
      if (!docType) {        
        res.status(404).json({
          message: `Doc type with id ${userRole_id} not found`
        });
        return;
      };
      
      const newProfile = repo.create({userRole, docType, name, lastName, secondLastName, birthDate, phone, countryCode, cityCode, email, docNum, nitCode, employeeCode, username, password});

      await repo.save(newProfile);

      res.status(201).json({
        message: `Profile data created successfully`
      });
    } catch (error) {
      console.error(`Error fetching Profile data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new ProfileController();