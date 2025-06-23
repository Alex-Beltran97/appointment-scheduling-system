import { Request, Response } from 'express';
import { generateAvailableSlotsForConsultant } from '../../Services/generateAvailableSlotsForConsultant';

class SlotGeneratorController {
  public async generateSlots(req: Request, res: Response): Promise<void> {
    const { consultantId } = req.body;

    if (!consultantId) {
      res.status(400).json({ error: 'El campo consultantId es obligatorio.' });
      return;
    }

    try {
      await generateAvailableSlotsForConsultant(consultantId);
      res.status(200).json({ message: `Slots generados para el consultor con ID ${consultantId}.` });
    } catch (error) {
      console.error('Error generando slots:', error);
      res.status(500).json({ error: 'Ocurrió un error generando los slots.', details: error });
    }
  }
}

export default new SlotGeneratorController();
