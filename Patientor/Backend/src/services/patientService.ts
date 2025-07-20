import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById 
};
