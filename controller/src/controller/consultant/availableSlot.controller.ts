import { Request, Response } from "express";
import { AvailableSlot } from "../../models/consultants";
import { AppSource } from "../../data";

class AvailableSlotController {
  public async getAvailableSlots(req: Request, res: Response): Promise<void> {
    try {
      const { consultant_id, date, service_id } = req.query;

      const slotRepo = AppSource.getRepository(AvailableSlot);

      const filters: any = {
        is_booked: false
      };

      if (consultant_id) {
        filters.consultant = { id: +consultant_id };
      }

      if (service_id) {
        filters.service = { id: +service_id };
      }

      if (date) {
        filters.date = new Date(date as string);
      }

      const slots = await slotRepo.find({
        where: filters,
        relations: ['consultant', 'service'],
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
