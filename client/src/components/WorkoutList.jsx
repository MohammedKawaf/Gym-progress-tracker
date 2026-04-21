import WorkoutCard from "./WorkoutCard";

function WorkoutList({ workouts, onDeleteWorkout }) {
  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout._id}
          workout={workout}
          onDeleteWorkout={onDeleteWorkout}
        />
      ))}
    </div>
  );
}

export default WorkoutList;