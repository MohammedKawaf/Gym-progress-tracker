import { useState } from "react";

function WorkoutForm({ onAddWorkout, users }) {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    date: "",
    durationMinutes: "",
    intensityLevel: "Medium",
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
        userId: "",
        title: "",
        date: "",
        durationMinutes: "",
        intensityLevel: "Medium",
      });
    } catch (error) {
      console.error("POST /api/workouts error:", error);
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h2>Add Workout</h2>

      <select
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        required
      >
        <option value="">Choose user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

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

      <button type="submit">Add Workout</button>
    </form>
  );
}

export default WorkoutForm;