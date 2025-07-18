import express from 'express';
import patientService from '../services/patientService';
import { PublicPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const publicPatients: PublicPatient[] = patientService.getNonSensitivePatients();
  res.send(publicPatients);
});

export default router;
