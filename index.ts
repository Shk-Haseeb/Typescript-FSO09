import express from 'express';
import { calculateBmi } from './bmiCalculator';

import { calculateExercises } from './exerciseCalculator';


const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi
  });
});


app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const body: any = req.body;

  if (!body.daily_exercises || !body.target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const daily = body.daily_exercises;
  const target = body.target;

  const dailyIsValid =
    Array.isArray(daily) && daily.every((n: unknown) => !isNaN(Number(n)));
  const targetIsValid = !isNaN(Number(target));

  if (!dailyIsValid || !targetIsValid) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(
    daily.map(Number),
    Number(target)
  );

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// I am ignoring the linter warning!