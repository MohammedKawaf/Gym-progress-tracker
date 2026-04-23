import WorkoutCard from "./WorkoutCard";

function WorkoutList({ workouts, onDeleteWorkout, onUpdateWorkout }) {
  if (workouts.length === 0) {
    return (
      <div className="empty-state">
        <h2>No workouts found</h2>
        <p>Select another user or add a new workout.</p>
      </div>
    );
  }

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