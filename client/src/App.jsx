import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";

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

  const addWorkoutToList = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkoutFromList = (id) => {
    const updatedWorkouts = workouts.filter((workout) => workout._id !== id);
    setWorkouts(updatedWorkouts);
  };

  const updateWorkoutInList = (updatedWorkout) => {
    const updatedWorkouts = workouts.map((workout) =>
      workout._id === updatedWorkout._id ? updatedWorkout : workout
    );

    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="app">
      <Header />
      <WorkoutForm onAddWorkout={addWorkoutToList} />

      {loading && <p>Loading workouts...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <WorkoutList
          workouts={workouts}
          onDeleteWorkout={deleteWorkoutFromList}
          onUpdateWorkout={updateWorkoutInList}
        />
      )}
    </div>
  );
}

export default App;