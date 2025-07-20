export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  entries: Entry[];
}

export interface Entry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;