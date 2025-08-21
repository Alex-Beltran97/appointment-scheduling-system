import { Request, Response } from "express";
import { AppSource } from "../../data";
import { Appointment, AppointmentStatus, AvailableSlot, ConsultantNotification, ConsultantService, NotificationType } from "../../models/consultants";
import { Profile } from "../../models/auth";
import { sendMail } from "../../Services/email/sendEmailService";
import { getIO } from "../../Services/socket";

import moment, { Moment } from 'moment';
import { Between } from "typeorm";
moment.locale();

class AppointmentController {
  public async getAppointments(req: Request, res: Response): Promise<void> {
    const { consultant_id, status_id, service_id, date, appointment_id, year, month } = req.query;

    const isValidDate = (d: string): boolean => {
      const parsedDate = new Date(d);
      return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
    };

    const formattedYear = +year!; 
    const startYear = moment.utc(`${formattedYear}-01-01`).toDate();
    const endYear = moment.utc(`${formattedYear + 1}-01-01`).toDate();
    
    let dateCondition = {};

    if (isValidDate(date as string)) {
      dateCondition = { date: (date as unknown) as Date };
    } else if (year && !isNaN(new Date(String(year)).getFullYear())) {
      dateCondition = { date: Between(startYear, endYear) };
    };

    try {
      const repo = AppSource.getRepository(Appointment);
      const appointments = await repo.find({
        where: {
          ...(consultant_id  && !isNaN(+consultant_id) ? { consultant: { id: +consultant_id } } : {}),
          ...(status_id  && !isNaN(+status_id) ? { status: { id: +status_id } } : {}),
          ...(service_id  && !isNaN(+service_id) ? { service: { id: +service_id } } : {}),
          ...dateCondition,
          appoinment_id: appointment_id ? appointment_id.toString() : undefined
        },
        relations: ['consultant', 'service', 'status'],
        order: {
          date: 'ASC',
          start_time: 'ASC'
        }
      });

      const filtered = appointments.filter(app => {
        const _dateMonth = (+app.date.getMonth()) + 1;

        if (month && !isNaN(+month)) {
          return app.consultant?.is_active && 
            app.service?.is_active &&
            _dateMonth === +month
        };
        
        return app.consultant?.is_active && 
          app.service?.is_active;
      });

      res.status(200).json({
        length: filtered?.length,
        response: filtered,
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
        where: { id },
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
        status_id = 1,
        appoinment_id
      } = req.body;

      const appointmentRepo = AppSource.getRepository(Appointment);
      const serviceRepo = AppSource.getRepository(ConsultantService);
      const profileRepo = AppSource.getRepository(Profile);
      const statusRepo = AppSource.getRepository(AppointmentStatus);
      const slotRepo = AppSource.getRepository(AvailableSlot);
      const notificationRepo = AppSource.getRepository(ConsultantNotification);
      const notificationTypeRepo = AppSource.getRepository(NotificationType);

      const consultant = await profileRepo.findOneBy({ id: consultant_id });
      const service = await serviceRepo.findOneBy({ id: service_id });
      const status = await statusRepo.findOneBy({ id: status_id });
      const notificationType = await notificationTypeRepo.findOneBy({ id: 1 });

      if (!consultant || !service || !status || !notificationType) {
        res.status(404).json({
          message: 'Invalid consultant, service, status, or notification type'
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
        appoinment_id,
        is_active: true
      });


      const slot = await slotRepo.findOne({
        where: {
          service: { id: service_id },
          date,
          start_time,
          end_time,
          is_booked: false
        },
        relations: ['service']
      });

      if (!slot) {
        res.status(400).json({
          message: 'No available slot found for the given date and time'
        });
        return;
      };

      slot.is_booked = true;
      await appointmentRepo.save(newAppointment);
      await slotRepo.save(slot);

      sendMail(client_email, 'Date Fixer - Confirmacion de agenda', newAppointment);

      const notification = notificationRepo.create({
        consultant,
        notificationType,
        message: `Se ha creado una nueva cita con el cliente ${clientFullName} para el servicio ${service.name} el ${moment(date).format('LLLL')} de ${start_time} a ${end_time}.`,
      });
      await notificationRepo.save(notification);

      const io = getIO();

      io.emit('new_notification', {
        id: notification.id,
        message: notification.message,
        created_at: notification.created_at
      });

      res.status(201).json({
        message: 'Appointment created and slot marked as booked successfully'
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async completeAppointment(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    };

    try {
      const repo = AppSource.getRepository(Appointment);
      const statusRepo = AppSource.getRepository(AppointmentStatus);

      const appointment = await repo.findOne({
        where: { id },
        relations: ['consultant', 'service']
      });

      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }

      const newStatus = await statusRepo.findOneBy({ id: 3 });

      if (!newStatus) {
        res.status(404).json({ message: 'Status not found' });
        return;
      }

      repo.merge(appointment, {
        is_active: false,
        status: newStatus
      });

      await repo.save(appointment);

      res.status(200).json({
        message: 'Appointment completed successfully'
      });
    } catch (error) {
      console.error('Error completing appointment:', error);
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
      const statusRepo = AppSource.getRepository(AppointmentStatus);
      const notificationRepo = AppSource.getRepository(ConsultantNotification);
      const notificationTypeRepo = AppSource.getRepository(NotificationType);
      const profileRepo = AppSource.getRepository(Profile);

      const appointment = await repo.findOne({
        where: { id },
        relations: ['consultant', 'service']
      });

      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }

      const newStatus = await statusRepo.findOneBy({ id: 2 });
    
      if (!newStatus) {
        res.status(404).json({ message: 'Status not found' });
        return;
      };

      const consultant = await profileRepo.findOneBy({ id: appointment.consultant.id });

      if (!consultant) {
        res.status(404).json({ message: 'Consultant not found' });
        return;
      };

      const notificationType = await notificationTypeRepo.findOneBy({ id: 3 });

      if (!notificationType) {
        res.status(404).json({ message: 'Notification type not found' });
        return;
      };

      repo.merge(appointment, {
        is_active: false,
        status: newStatus
      });

      await repo.save(appointment);

      const slot = await slotRepo.findOne({
        where: {
          service: { id: appointment.service.id },
          date: appointment.date,
          start_time: appointment.start_time,
          end_time: appointment.end_time
        }
      });

      if (slot && slot.is_booked) {
        slot.is_booked = false;
        await slotRepo.save(slot);
      };

      sendMail(appointment.client_email[0], 'Date Fixer - Cancelacion de agenda', appointment, false);

      const notification = notificationRepo.create({
        consultant,
        notificationType,
        message: `La cita con el cliente ${appointment.clientFullName} para el servicio ${appointment.service.name} del ${moment(appointment.date).format('LLLL')} de ${appointment.start_time} a ${appointment.end_time} ha sido cancelada.`,
      });
      await notificationRepo.save(notification);

      const io = getIO();

      io.emit('new_notification', {
        id: notification.id,
        message: notification.message,
        created_at: notification.created_at
      });

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
