import { useNavigate } from "react-router-dom";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseGrid({ exercises, isMember }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
      }}
    >
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          isMember={isMember}
          onViewExercise={() => navigate(`/exercise/${exercise.id}`)}
        />
      ))}
    </div>
  );
}
