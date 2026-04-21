import WorkoutCard from "./WorkoutCard";

function WorkoutList({ workouts }) {
  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <WorkoutCard key={workout._id} workout={workout} />
      ))}
    </div>
  );
}

export default WorkoutList;