import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/workouts");

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        setError("Could not load workouts");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="app">
      <h1>Gym Progress Tracker</h1>
      <p>Track your workouts and training progress.</p>

      {loading && <p>Loading workouts...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="workout-list">
          {workouts.map((workout) => (
            <div key={workout._id} className="workout-card">
              <h2>{workout.title}</h2>
              <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
              <p>Duration: {workout.durationMinutes} minutes</p>
              <p>Intensity: {workout.intensityLevel}</p>
              <p>Notes: {workout.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;