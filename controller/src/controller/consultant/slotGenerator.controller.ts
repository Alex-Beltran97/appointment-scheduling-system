import { Request, Response } from 'express';
import { generateAvailableSlotsForServices } from '../../Services/generateAvailableSlotsForServices';

class SlotGeneratorController {
  public async generateSlots(req: Request, res: Response): Promise<void> {
    try {
      await generateAvailableSlotsForServices();
      res.status(200).json({
        message: 'Slots generados exitosamente.'
      });
    } catch (error) {
      console.error('Error generando slots:', error);
      res.status(500).json({ error: 'Ocurrió un error generando los slots.', details: error });
    }
  }
}

export default new SlotGeneratorController();
