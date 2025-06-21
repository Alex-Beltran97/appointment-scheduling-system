import { Request, Response } from "express";
import { AppSource } from "../../data";
import { Profile, ProfileDTO } from "../../models/auth";
import bcrypt from 'bcrypt';
import { sign, verify } from "jsonwebtoken";
import { config } from "../../config";

class LoginController {
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

      res.cookie('access_token', token, {
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

  public async logoutProfile(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).json({ message: 'Error interno al cerrar sesión' });
    }
  }

  public async verifySession(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies.access_token;

      if (!token) {
        res.status(401).json({ message: 'No autenticado' });
        return;
      }

      const decoded = verify(token, config.login.jwtKey!);
      res.status(200).json({ message: 'Sesión válida', user: decoded });
    } catch (error) {
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  }
};

export default new LoginController();