import WorkoutCard from "./WorkoutCard";

function WorkoutList({ workouts, onDeleteWorkout, onUpdateWorkout }) {
  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout._id}
          workout={workout}
          onDeleteWorkout={onDeleteWorkout}
          onUpdateWorkout={onUpdateWorkout}
        />
      ))}
    </div>
  );
}

export default WorkoutList;