import type { Moment } from "moment";

export interface Login {
  username:       string;
  password:       string
};

export interface Profile {
    name:           string;
    lastName:       string;
    secondLastName: string;
    birthDate:     Moment;
    dialCountry?:     string;
    phone:          string;
    countryCode:    string;
    departmentCode: string;
    cityCode:       string;
    email:          string;
    docNum:         number;
    nitCode:        string;
    employeeCode:   string;
    username:       string;
    password:       string;
    confirmPassword?: string;
    userRole:       string;
    docType:        string;
}

export interface DepartmentItem {
  id: string;
  name: string;
}

export interface CountryItem {
  label: string;
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

export interface Country {
    flags: Flags;
    name:  Name;
    cca2:  string;
    idd:   Idd;
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

export interface NativeName {
    fra: Fra;
}

export interface Fra {
    official: string;
    common:   string;
}

export interface Department {
    id:                     number;
    name:                   string;
    description:            string;
    cityCapitalId:          number;
    municipalities:         number;
    surface:                number;
    population:             number;
    phonePrefix:            string;
    countryId:              number;
    cityCapital:            CityCapital;
    country:                null;
    cities:                 null;
    regionId:               number;
    region:                 null;
    naturalAreas:           null;
    maps:                   null;
    indigenousReservations: null;
    airports:               null;
}

export interface CityCapital {
    id:                     number;
    name:                   string;
    description:            string;
    surface:                number;
    population:             number;
    postalCode:             string;
    departmentId:           number;
    department:             null;
    touristAttractions:     null;
    presidents:             null;
    indigenousReservations: null;
    airports:               null;
    radios:                 null;
}

export interface City {
    id:                     number;
    name:                   string;
    description:            string;
    surface:                null;
    population:             null;
    postalCode:             null;
    departmentId:           number;
    department:             null;
    touristAttractions:     null;
    presidents:             null;
    indigenousReservations: null;
    airports:               null;
    radios:                 null;
}

export interface CityItem {
    id:                     number;
    name:                   string;
}

export interface UserRole {
    id:         number;
    role:       string;
}

export interface DocType {
    id:         number;
    docType:    string;
}

