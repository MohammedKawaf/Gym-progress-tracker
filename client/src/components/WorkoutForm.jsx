import { useState } from "react";

function WorkoutForm({ onAddWorkout }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    durationMinutes: "",
    intensityLevel: "Medium",
    notes: "",
    userId: "69e4c9fac14c0efcad227e77",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          durationMinutes: Number(formData.durationMinutes),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create workout");
      }

      const newWorkout = await response.json();
      onAddWorkout(newWorkout);

      setFormData({
        title: "",
        date: "",
        durationMinutes: "",
        intensityLevel: "Medium",
        notes: "",
        userId: "69e4c9fac14c0efcad227e77",
      });
    } catch (error) {
      console.error("POST /api/workouts error:", error);
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h2>Add Workout</h2>

      <input
        type="text"
        name="title"
        placeholder="Workout title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="durationMinutes"
        placeholder="Duration in minutes"
        value={formData.durationMinutes}
        onChange={handleChange}
        required
      />

      <select
        name="intensityLevel"
        value={formData.intensityLevel}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <button type="submit">Add Workout</button>
    </form>
  );
}

export default WorkoutForm;