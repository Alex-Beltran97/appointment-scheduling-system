import { IsNull } from "typeorm";
import { AppSource } from "../data";
import { AvailableSlot, ConsultantAvailability, ConsultantException, ConsultantService } from "../models/consultants";
import { parseTimeToDate } from "../utils";

export const generateAvailableSlotsForConsultant = async (consultantId: number): Promise<void> => {
  const slotRepo = AppSource.getRepository(AvailableSlot);
  const availabilityRepo = AppSource.getRepository(ConsultantAvailability);
  const serviceRepo = AppSource.getRepository(ConsultantService);
  const exceptionRepo = AppSource.getRepository(ConsultantException);

  const availabilities = await availabilityRepo.find({
    where: { consultant: { id: consultantId } }
  });

  const services = await serviceRepo.find({
    where: { consultant: { id: consultantId }, is_active: true }
  });

  if (!availabilities.length || !services.length) return;

  const daysToGenerate = 14;
  const today = new Date();

  for (let dayOffset = 0; dayOffset < daysToGenerate; dayOffset++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);
    const weekday = currentDate.getDay() === 0 ? 7 : currentDate.getDay(); // convert Sunday (0) → 7

    const dayAvailability = availabilities.filter(av => av.weekday === weekday);
    if (!dayAvailability.length) continue;

    const isFullDayException = await exceptionRepo.findOne({
      where: {
        consultant: { id: consultantId },
        date: currentDate,
        start_time: IsNull(),
        end_time: IsNull()
      }
    });
    if (isFullDayException) continue;

    for (const availability of dayAvailability) {
      for (const service of services) {
        const slotDuration = service.durationMinutes;
        const slots: AvailableSlot[] = [];

        if (
          !availability.start_time ||
          !availability.end_time ||
          typeof availability.start_time !== 'string' ||
          typeof availability.end_time !== 'string' ||
          !availability.start_time.includes(':') ||
          !availability.end_time.includes(':')
        ) {
          console.warn('⛔ Tiempo inválido en disponibilidad:', availability);
          continue;
        };
        
        const start = parseTimeToDate(currentDate, availability.start_time);
        const end = parseTimeToDate(currentDate, availability.end_time);
        
        if (!start || !end || start >= end) {
          console.warn('⛔ Horario de inicio o fin inválido:', availability);
          continue;
        };

        while (start < end) {
          const slotEnd = new Date(start.getTime() + slotDuration * 60000);

          // Skip if exceeds end of availability
          if (slotEnd > end) break;

          // Check for overlapping partial exceptions
          const conflict = await exceptionRepo.findOne({
            where: {
              consultant: { id: consultantId },
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
              consultant: { id: consultantId },
              service: { id: service.id },
              date: currentDate,
              start_time: start.toTimeString().substring(0, 8),
              end_time: slotEnd.toTimeString().substring(0, 8)
            }
          });
          if (!exists) {
            const newSlot = slotRepo.create({
              consultant: { id: consultantId },
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
