import { IsNull } from "typeorm";
import { AppSource } from "../data";
import { AvailableSlot, ConsultantAvailability, ConsultantException, ConsultantService } from "../models/consultants";
import { parseTimeToDate } from "../utils";

export const generateAvailableSlotsForServices = async (): Promise<void> => {
  const slotRepo = AppSource.getRepository(AvailableSlot);
  const availabilityRepo = AppSource.getRepository(ConsultantAvailability);
  const serviceRepo = AppSource.getRepository(ConsultantService);
  const exceptionRepo = AppSource.getRepository(ConsultantException);

  const services = await serviceRepo.find({
    where: { is_active: true },
    relations: ['consultant']
  });

  const daysToGenerate = 14;
  const today = new Date();

  for (const service of services) {
    const availabilities = await availabilityRepo.find({
      where: { service: { id: service.id } }
    });

    if (!availabilities.length) continue;

    for (let dayOffset = 0; dayOffset < daysToGenerate; dayOffset++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + dayOffset);
      const weekday = currentDate.getDay() === 0 ? 7 : currentDate.getDay(); // Domingo a 7

      const dayAvailability = availabilities.filter(av => av.weekday === weekday);
      if (!dayAvailability.length) continue;

      const isFullDayException = await exceptionRepo.findOne({
        where: {
          service: { id: service.id },
          date: currentDate,
          start_time: IsNull(),
          end_time: IsNull()
        }
      });
      if (isFullDayException) continue;

      for (const availability of dayAvailability) {
        const slotDuration = service.durationMinutes;
        const slots: AvailableSlot[] = [];

        const start = parseTimeToDate(currentDate, availability.start_time);
        const end = parseTimeToDate(currentDate, availability.end_time);

        if (!start || !end || start >= end) continue;

        while (start < end) {
          const slotEnd = new Date(start.getTime() + slotDuration * 60000);
          if (slotEnd > end) break;

          const conflict = await exceptionRepo.findOne({
            where: {
              service: { id: service.id },
              date: currentDate,
              start_time: availability.start_time,
              end_time: availability.end_time
            }
          });
          if (conflict) {
            start.setTime(slotEnd.getTime());
            continue;
          }

          const exists = await slotRepo.findOne({
            where: {
              service: { id: service.id },
              date: currentDate,
              start_time: start.toTimeString().substring(0, 8),
              end_time: slotEnd.toTimeString().substring(0, 8)
            }
          });
          if (!exists) {
            const newSlot = slotRepo.create({
              service: { id: service.id },
              date: currentDate,
              start_time: start.toTimeString().substring(0, 8),
              end_time: slotEnd.toTimeString().substring(0, 8),
              is_booked: false
            });
            slots.push(newSlot);
          }

          start.setTime(slotEnd.getTime());
        }

        if (slots.length) await slotRepo.save(slots);
      }
    }
  }
};
