function WorkoutCard({ workout }) {
  return (
    <div className="workout-card">
      <h2>{workout.title}</h2>
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
      <p>Duration: {workout.durationMinutes} minutes</p>
      <p>Intensity: {workout.intensityLevel}</p>
      <p>Notes: {workout.notes}</p>
    </div>
  );
}

export default WorkoutCard;