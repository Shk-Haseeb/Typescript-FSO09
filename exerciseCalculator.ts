interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const totalHours = dailyHours.reduce((a, b) => a + b, 0);
  const average = totalHours / periodLength;

  let rating = 1;
  let ratingDescription = '';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent, target met!';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to work harder';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseExerciseArgs = (args: string[]): { target: number; dailyHours: number[] } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(arg => {
    if (isNaN(Number(arg))) {
      throw new Error('All values must be numbers');
    }
    return Number(arg);
  });

  if (isNaN(target)) {
    throw new Error('Target value must be a number');
  }

  return { target, dailyHours };
};

try {
  const { target, dailyHours } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e: unknown) {
  let msg = 'Error: ';
  if (e instanceof Error) msg += e.message;
  console.log(msg);
}

//Added CLI interface for 9.3