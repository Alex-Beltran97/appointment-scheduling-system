import { Request, Response } from "express";
import { AppSource } from "../../data";
import { Appointment, AppointmentStatus, AvailableSlot, ConsultantService } from "../../models/consultants";
import { Profile } from "../../models/auth";
import { normalizeDateToMidnight } from "../../utils";

class AppointmentController {
  public async getAppointments(req: Request, res: Response): Promise<void> {
    try {
      const repo = AppSource.getRepository(Appointment);
      const appointments = await repo.find({
        where: { is_active: true },
        relations: ['consultant', 'service', 'status']
      });

      res.status(200).json({
        response: appointments,
        message: 'Appointments fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getAppointment(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(Appointment);
      const appointment = await repo.findOne({
        where: { id, is_active: true },
        relations: ['consultant', 'service', 'status']
      });

      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }

      res.status(200).json({
        response: appointment,
        message: 'Appointment fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching appointment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const {
        consultant_id,
        service_id,
        clientFullName,
        client_email,
        client_phone,
        date,
        start_time,
        end_time,
        notes,
        status_id = 1
      } = req.body;

      const appointmentRepo = AppSource.getRepository(Appointment);
      const serviceRepo = AppSource.getRepository(ConsultantService);
      const profileRepo = AppSource.getRepository(Profile);
      const statusRepo = AppSource.getRepository(AppointmentStatus);
      const slotRepo = AppSource.getRepository(AvailableSlot);

      const consultant = await profileRepo.findOneBy({ id: consultant_id });
      const service = await serviceRepo.findOneBy({ id: service_id });
      const status = await statusRepo.findOneBy({ id: status_id });

      if (!consultant || !service || !status) {
        res.status(404).json({
          message: 'Invalid consultant, service, or status'
        });
        return;
      }

      const newAppointment = appointmentRepo.create({
        consultant,
        service,
        clientFullName,
        client_email,
        client_phone,
        date,
        start_time,
        end_time,
        notes,
        status,
        is_active: true
      });

      await appointmentRepo.save(newAppointment);

      const slot = await slotRepo.findOne({
        where: {
          consultant: { id: consultant_id },
          service: { id: service_id },
          date,
          start_time,
          end_time,
          is_booked: false
        },
        relations: ['consultant', 'service']
      });

      if (!slot) {
        res.status(400).json({
          message: 'No available slot found for the given date and time'
        });
        return;
      }

      slot.is_booked = true;
      await slotRepo.save(slot);

      res.status(201).json({
        message: 'Appointment created and slot marked as booked successfully'
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async deleteAppointment(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(Appointment);
      const slotRepo = AppSource.getRepository(AvailableSlot);

      const appointment = await repo.findOne({
        where: { id },
        relations: ['consultant', 'service']
      });

      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }

      appointment.is_active = false;
      await repo.save(appointment);

      const slot = await slotRepo.findOne({
        where: {
          consultant: { id: appointment.consultant.id },
          service: { id: appointment.service.id },
          date: appointment.date,
          start_time: appointment.start_time,
          end_time: appointment.end_time
        }
      });

      if (slot && slot.is_booked) {
        slot.is_booked = false;
        await slotRepo.save(slot);
      }

      res.status(200).json({
        message: 'Appointment canceled and slot released successfully'
      });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new AppointmentController();
