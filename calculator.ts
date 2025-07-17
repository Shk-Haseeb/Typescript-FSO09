type Operation = 'multiply' | 'add' | 'divide';
type Result = number;

const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    default:
      throw new Error('Invalid operation');
  }
};

try {
  console.log(calculator(10, 2, 'divide'));
} catch (error: unknown) {
  let message = 'Something went wrong: ';
  if (error instanceof Error) {
    message += error.message;
  }
  console.log(message);
}
