export interface Diagnosis {
  code: string;
  name: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export interface Entry {
}

export type PublicPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;