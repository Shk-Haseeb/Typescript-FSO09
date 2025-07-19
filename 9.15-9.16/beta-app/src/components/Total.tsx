import type { CoursePart } from '../App';

interface TotalProps {
  parts: CoursePart[];
}

const Total = ({ parts }: TotalProps) => {
  return (
    <p>
      Number of exercises {parts.reduce((sum, part) => sum + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
