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


export interface Slot {
    id:         number;
    date:       Date;
    start_time: string;
    end_time:   string;
    is_booked:  boolean;
    created_at: Date;
    updated_at: Date;
    service:    Service;
}

export interface Appointment {
    id:  number;
    consultant_id:  number;
    service_id:     number;
    clientFullName: string;
    client_email:   string[];
    client_phone:   string[];
    date:           Date | string;
    start_time:     string;
    end_time:       string;
    notes:          string;
    status_id:      number;
    appoinment_id:  string;
    is_active?:     boolean;
    service?:      Service;
    status?:       AppointmentStatus;
}

export interface AppointmentPayload {
    clientFullName: string;
    client_email:   string;
    client_phone:   string;
    notes:          string;
}

export interface AppointmentStatus {
    id:         number;
    status:     string;
    created_at: Date;
    updated_at: Date;
}
