import { useState } from "react";

function WorkoutCard({ workout, onDeleteWorkout, onUpdateWorkout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: workout.title,
    durationMinutes: workout.durationMinutes,
    intensityLevel: workout.intensityLevel,
    notes: workout.notes || "",
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
            notes: editData.notes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update workout");
      }

      const updatedWorkout = await response.json();
      onUpdateWorkout(updatedWorkout);
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
      notes: workout.notes || "",
    });
    setIsEditing(false);
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

          <textarea
            name="notes"
            value={editData.notes}
            onChange={handleEditChange}
          />

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
          <p>Notes: {workout.notes}</p>

          <div className="button-group">
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default WorkoutCard;