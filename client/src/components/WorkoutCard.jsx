import { useState } from "react";

function WorkoutCard({ workout, onDeleteWorkout, onUpdateWorkout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);

  const [editData, setEditData] = useState({
    title: workout.title,
    durationMinutes: workout.durationMinutes,
    intensityLevel: workout.intensityLevel,
  });

  const [exerciseData, setExerciseData] = useState({
    name: "",
    sets: "",
    reps: "",
  });

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

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/workouts/${workout._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editData.title,
            durationMinutes: Number(editData.durationMinutes),
            intensityLevel: editData.intensityLevel,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update workout");
      }

      const updatedWorkout = await response.json();

      const workoutWithExtras = {
        ...updatedWorkout,
        userId: workout.userId,
        exercises: workout.exercises || [],
      };

      onUpdateWorkout(workoutWithExtras);
      setIsEditing(false);
    } catch (error) {
      console.error("PUT workout error:", error);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: workout.title,
      durationMinutes: workout.durationMinutes,
      intensityLevel: workout.intensityLevel,
    });
    setIsEditing(false);
  };

  const handleExerciseChange = (event) => {
    const { name, value } = event.target;

    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleAddExercise = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/workouts/${workout._id}/exercises`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: exerciseData.name,
            sets: Number(exerciseData.sets),
            reps: Number(exerciseData.reps),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create exercise");
      }

      const newExercise = await response.json();

      const updatedWorkout = {
        ...workout,
        exercises: [...(workout.exercises || []), newExercise],
      };

      onUpdateWorkout(updatedWorkout);

      setExerciseData({
        name: "",
        sets: "",
        reps: "",
      });

      setShowExerciseForm(false);
      setShowExercises(true);
    } catch (error) {
      console.error("POST exercise error:", error);
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/workouts/${workout._id}/exercises/${exerciseId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete exercise");
      }

      const updatedWorkout = {
        ...workout,
        exercises: (workout.exercises || []).filter(
          (exercise) => exercise._id !== exerciseId
        ),
      };

      onUpdateWorkout(updatedWorkout);
    } catch (error) {
      console.error("DELETE exercise error:", error);
    }
  };

  return (
    <div className="workout-card">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
          />

          <input
            type="number"
            name="durationMinutes"
            value={editData.durationMinutes}
            onChange={handleEditChange}
          />

          <select
            name="intensityLevel"
            value={editData.intensityLevel}
            onChange={handleEditChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div className="button-group">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>{workout.title}</h2>
          <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
          <p>Duration: {workout.durationMinutes} minutes</p>
          <p>Intensity: {workout.intensityLevel}</p>
          <p>User: {workout.userId?.name || "Unknown user"}</p>
          <p>Goal: {workout.userId?.fitnessGoal || "No goal"}</p>

          <div className="button-group">
            <button
              className="exercise-button"
              onClick={() => setShowExercises(!showExercises)}
            >
              {showExercises ? "Hide Exercises" : "Show Exercises"}
            </button>

            <button
              className="add-exercise-button"
              onClick={() => setShowExerciseForm(!showExerciseForm)}
            >
              {showExerciseForm ? "Hide Add Exercise" : "Add Exercise"}
            </button>

            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>

          {showExerciseForm && (
            <form className="exercise-form" onSubmit={handleAddExercise}>
              <input
                type="text"
                name="name"
                placeholder="Exercise name"
                value={exerciseData.name}
                onChange={handleExerciseChange}
                required
              />

              <input
                type="number"
                name="sets"
                placeholder="Sets"
                value={exerciseData.sets}
                onChange={handleExerciseChange}
                required
              />

              <input
                type="number"
                name="reps"
                placeholder="Reps"
                value={exerciseData.reps}
                onChange={handleExerciseChange}
                required
              />

              <button type="submit" className="save-button">
                Save Exercise
              </button>
            </form>
          )}

          {showExercises && (
            <>
              {workout.exercises && workout.exercises.length > 0 ? (
                <div>
                  <h3>Exercises</h3>
                  <ul className="exercise-list">
                    {workout.exercises.map((exercise) => (
                      <li key={exercise._id} className="exercise-item">
                        <span>
                          {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
                        </span>
                        <button
                          className="delete-exercise-button"
                          onClick={() => handleDeleteExercise(exercise._id)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No exercises for this workout</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default WorkoutCard;