function WorkoutCard({ workout, onDeleteWorkout }) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${workout.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/workouts/${workout._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete workout");
      }

      onDeleteWorkout(workout._id);
    } catch (error) {
      console.error("DELETE workout error:", error);
    }
  };

  return (
    <div className="workout-card">
      <h2>{workout.title}</h2>
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
      <p>Duration: {workout.durationMinutes} minutes</p>
      <p>Intensity: {workout.intensityLevel}</p>
      <p>Notes: {workout.notes}</p>

      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default WorkoutCard;