import express from 'express';
import patientService from '../services/patientService';
import { PublicPatient } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const publicPatients: PublicPatient[] = patientService.getNonSensitivePatients();
  res.send(publicPatients);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong.';
    if (e instanceof Error) {
      errorMessage += ' Error: ' + e.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

export default router;
