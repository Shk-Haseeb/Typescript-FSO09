import express from 'express';
import patientService from '../services/patientService';
import { PublicPatient } from '../types';
import toNewPatient from '../utils';
import { z } from 'zod';

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
    if (e instanceof z.ZodError) {
      res.status(400).send({ error: e.issues });
    } else {
      res.status(400).send({ error: 'Unknown error' });
    }
  }
});

export default router;
