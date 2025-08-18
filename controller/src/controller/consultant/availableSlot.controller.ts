import { Request, Response } from "express";
import { AvailableSlot } from "../../models/consultants";
import { AppSource } from "../../data";
import { Between, IsNull } from "typeorm";

class AvailableSlotController {
  public async getAvailableSlots(req: Request, res: Response): Promise<void> {
    try {
      const { date, service_id } = req.query;

      const slotRepo = AppSource.getRepository(AvailableSlot);

      const filters: any = {
        is_booked: false,
      };

      if (service_id && service_id !== 'null' && service_id !== 'undefined') {
        filters.service = { id: +service_id };
      };

      if (date && date !== 'null' && date !== 'undefined') {
        filters.date = date;
      };

      const slots = await slotRepo.find({
        where: { ...filters },
        relations: ['service'],
        order: {
          date: 'ASC',
          start_time: 'ASC'
        }
      });

      res.status(200).json({
        response: slots,
        message: 'Available slots fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching available slots:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new AvailableSlotController();
