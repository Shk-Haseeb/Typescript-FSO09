import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (param: string): param is Gender =>
  Object.values(Gender).map(g => g.toString()).includes(param);

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('Invalid or missing name');
  return name;
};

const parseDateOfBirth = (dob: unknown): string => {
  if (!isString(dob) || !isDate(dob)) throw new Error('Invalid or missing date of birth');
  return dob;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error('Invalid or missing SSN');
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) throw new Error('Invalid or missing gender');
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('Invalid or missing occupation');
  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing patient data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
  }

  throw new Error('Missing required fields');
};

export default toNewPatient;
