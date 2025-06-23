import type { Profile } from "../auth/Register";

export interface ServicePayload {
    consultant_id:   string | number;
    name:            string;
    description:     string;
    durationMinutes: number;
    price:           number;
    schedules?:       ScheduleItem[];
}

export interface AvailabilityPayload {
  service_id: number;
  weekday: number;
  start_time: string;
  end_time: string;
}

export interface ScheduleItem {
  day: string;
  initHour: string;
  endtHour: string;
}

export interface Service {
    id:                       number;
    name:                     string;
    description:              string;
    durationMinutes:          number;
    price:                    string;
    is_active:                boolean;
    created_at:               Date;
    updated_at:               Date;
    consultant:               Profile;
    consultantAvailabilities: Availability[];
}

export interface Availability {
    id:         number;
    weekday:    number;
    start_time: string;
    end_time:   string;
    created_at: Date;
    updated_at: Date;
    service:    Service;
}
