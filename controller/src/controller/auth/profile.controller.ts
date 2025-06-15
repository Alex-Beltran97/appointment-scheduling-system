import { Request, Response } from 'express';
import { AppSource } from '../../data';
import { DocType } from '../../models/core';
import { Profile, UserRole, ProfileDTO } from '../../models/auth';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../../config';

class ProfileController {
  private readonly saltRounds: number = config.login.saltRounds ? parseInt(config.login.saltRounds) : 10;
  private readonly JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY!;

  public async getProfiles(req: Request, res: Response) : Promise<void> {
    const { deleted } = req.query;
    try {
      const deletedParsed = deleted && JSON.parse(deleted as string) ? true : false;
      const repo = AppSource.getRepository(Profile);
      const response = await repo.find({
        where: { is_active: !deletedParsed },
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
  
  public async getProfile(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Profile);
      const response = await repo.findOne({
        where: { id, is_active: true },
        relations: ['userRole', 'docType']
      });

      if (!response) {
        res.status(404).json({ message: "Profile was not found" });
        return;
      };

      const profile = ProfileDTO.fromEntity(response);

      res.status(200).json({
        response: profile,
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
        docType_id,
        docNum,
        email,
        username,
        password,
        ...rest
      } = req.body;

      const repo = AppSource.getRepository(Profile);
      const userRolerepo = AppSource.getRepository(UserRole);
      const docTyperepo = AppSource.getRepository(DocType);

      const userRole = await userRolerepo.findOneBy({ id: userRole_id });
      const docType = await docTyperepo.findOneBy({ id: docType_id });

      const existingProfile = await repo.findOne({
        where: [
          { docNum },
          { email },
          { username }
        ]
      });

      if (existingProfile) {
        if (existingProfile.docNum === docNum) {
          res.status(409).json({
            message: `Profile with document number ${docNum} already exists`
          });
          return;
        } else if (existingProfile.email === email) {
          res.status(409).json({
            message: `Profile with email ${email} already exists`
          });
          return;
        } else if (existingProfile.username === username) {
          res.status(409).json({
            message: `Profile with username ${username} already exists`
          });
          return;
        };
      };

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

      const hashedPassword = await bcrypt.hash(password, this.saltRounds);
      
      const newProfile = repo.create({
        userRole,
        docType,
        docNum,
        email,
        username,
        password: hashedPassword,
        ...rest
      });

      await repo.save(newProfile);

      res.status(201).json({
        message: `Profile data created successfully`
      });
    } catch (error) {
      console.error(`Error fetching Profile data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }

  public async loginProfile(req: Request, res: Response) : Promise<void> {
    try {

      const {
        username,
        password,
      } = req.body;

      const repo = AppSource.getRepository(Profile);

      const existingProfile = await repo.findOne({
        where: { username, is_active: true },
        relations: ['userRole', 'docType']
      });

      if (!existingProfile) {
        res.status(404).json({ message: "Profile was not found" });
        return;
      };

      const isPasswordValid = await bcrypt.compare(password, existingProfile.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      };
    
      const profile = ProfileDTO.fromEntity(existingProfile);

      const token = sign(
        { id: profile.id, username: profile.username, userRole: profile.userRole },
        config.login.jwtKey!,
        { expiresIn: '1h' }
      );

      res.cookie('acces_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000
      });

      res.status(200).json({
        message: `Profile logged in successfully`,
        token,
      });    
    } catch (error) {
      console.error(`Error fetching Profile data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async updateProfile(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const {
        userRole_id,
        docType_id,
        ...rest
      } = req.body;

      const repo = AppSource.getRepository(Profile);
      const userRolerepo = AppSource.getRepository(UserRole);
      const docTyperepo = AppSource.getRepository(DocType);

      let userRole, docType;

      if (docType_id) {
        docType = await docTyperepo.findOneBy({ id: docType_id });
        if (!docType) {        
          res.status(404).json({
            message: `Doc type with id ${userRole_id} not found`
          });
          return;
        };

      };

      if (userRole_id) {
        userRole = await userRolerepo.findOneBy({ id: userRole_id });
        if (!userRole) {
          res.status(404).json({
            message: `User Role with id ${userRole_id} not found`
          });
          return;
        };
      };
      
      const profile = await repo.findOneBy({ id });      

      if (!profile) {
        res.status(404).json({ message: "Profile was not found" });
        return;
      };
      
      repo.merge(profile, {
        ...rest,
        ...(userRole && { userRole }),
        ...(docType && { docType })
      });

      await repo.save(profile);

      res.status(200).json({
        message: `Profile data updated successfully`
      });
    } catch (error) {
      console.error(`Error fetching Profile data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
  
  public async deleteProfile(req: Request, res: Response) : Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" })
      return;
    };

    try {
      const repo = AppSource.getRepository(Profile);
      
      const profile = await repo.findOneBy({ id });      

      if (!profile) {
        res.status(404).json({ message: "Profile was not found" });
        return;
      };
      
      repo.merge(profile, { is_active: false });

      await repo.save(profile);

      res.status(200).json({
        message: `Profile data deleted successfully`
      });
    } catch (error) {
      console.error(`Error fetching Profile data:`, error);
      res.status(500).json({ message: 'Internal Server Error' });    
    };
  }
};

export default new ProfileController();