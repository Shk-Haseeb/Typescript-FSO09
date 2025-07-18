import patients from '../../data/patients';
import { Patient, PublicPatient } from '../types';

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getPatients,
  getNonSensitivePatients
};
