import { Request, Response } from "express";
import { AppSource } from "../../data";
import { ConsultantService } from "../../models/consultants/ConsultantService/ConsultantService";
import { ILike } from "typeorm";

class ConsultantServiceSearchController {
  public async search(req: Request, res: Response): Promise<void> {
    const keyword = req.query.q as string;

    if (!keyword) {
      res.status(400).json({ error: "Falta la palabra clave (q)" });
      return;
    }

    try {
      const repo = AppSource.getRepository(ConsultantService);

      const results = await repo.find({
        where: [
          { name: ILike(`%${keyword}%`), is_active: true },
          { description: ILike(`%${keyword}%`), is_active: true },
        ],
        relations: ['consultant', 'consultantAvailabilities'],
      });

      res.status(200).json({
        response: results,
        message: `Resultados encontrados para "${keyword}"`,
      });
    } catch (error) {
      console.error("Error buscando servicios:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
}

export default new ConsultantServiceSearchController();
