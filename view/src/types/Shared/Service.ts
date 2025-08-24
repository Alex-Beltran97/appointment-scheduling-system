import type { Profile } from "../auth/Register";

export interface ServicePayload {
    consultant_id:   string | number;
    name:            string;
    description:     string;
    durationMinutes: number;
    price:           number;
    schedules?:      ScheduleItem[];
}

export interface AvailabilityPayload {
  service_id: number;
  weekday:    number;
  start_time: string;
  end_time:   string;
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
export interface NotificationPayload {
  consultantId:        number;
  notificationTypeId:  number;
  message:             string;
}

export interface NotificationMsg {
  id:          number;
  message:     string;
  created_at:  Date;
}

export interface Contract {
    id:         number;
    company:    Company;
    employee:   Employee;
    is_active:  boolean;
    start_date: Date;
    end_date:   null;
    created_at: Date;
    updated_at: Date;
}

export interface Company {
    id:         number;
    name:       string;
    nit_code:   string;
    is_active:  boolean;
    created_at: Date;
    updated_at: Date;
}

export interface Employee {
    id:             number;
    name:           string;
    lastName:       string;
    secondLastName: string;
    birthDate:      Date;
    email:          string;
    phone:          string;
    docNum:         number;
    employeeCode:   string;
    created_at:     Date;
    updated_at:     Date;
    docType:        DocType;
    employeeRole:   EmployeeRole;
}

export interface DocType {
    id:         number;
    docType:    string;
    created_at: Date;
    updated_at: Date;
}

export interface EmployeeRole {
    id:           number;
    employeeRole: string;
    is_active:    boolean;
    created_at:   Date;
    updated_at:   Date;
}

export interface IActiveContract {
    id:                  number;
    employee_start_date: Date;
    employee_is_active:  boolean;
    company_name:        string;
    company_nit:         string;
    employee_fullname:   string;
    employee_id:         number;
    employee_doc_num:    number;
    employee_code:       string;
    employee_rol_id:     number;
    employee_rol_name:   string;
}

export interface Employee {
    id:             number;
    name:           string;
    lastName:       string;
    secondLastName: string;
    birthDate:      Date;
    email:          string;
    phone:          string;
    docNum:         number;
    employeeCode:   string;
    created_at:     Date;
    updated_at:     Date;
}
