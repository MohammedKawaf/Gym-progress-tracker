import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";
import UserFilter from "./components/UserFilter";
import UserDetails from "./components/UserDetails";
import UserForm from "./components/UserForm";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workoutsResponse = await fetch("http://localhost:5000/api/workouts");
        const usersResponse = await fetch("http://localhost:5000/api/users");

        if (!workoutsResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const workoutsData = await workoutsResponse.json();
        const usersData = await usersResponse.json();

        setWorkouts(workoutsData);
        setAllWorkouts(workoutsData);
        setUsers(usersData);
      } catch (error) {
        setError("Could not load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addWorkoutToList = (newWorkout) => {
    const selectedUserObject = users.find((user) => user._id === newWorkout.userId);

    const workoutWithUser = {
      ...newWorkout,
      userId: selectedUserObject || newWorkout.userId,
    };

    const updatedWorkouts = [...workouts, workoutWithUser];
    const updatedAllWorkouts = [...allWorkouts, workoutWithUser];

    setWorkouts(updatedWorkouts);
    setAllWorkouts(updatedAllWorkouts);
  };

  const addUserToList = (newUser) => {
    setUsers([...users, newUser]);
    setShowUserForm(false);
  };

  const deleteWorkoutFromList = (id) => {
    const updatedWorkouts = workouts.filter((workout) => workout._id !== id);
    const updatedAllWorkouts = allWorkouts.filter((workout) => workout._id !== id);

    setWorkouts(updatedWorkouts);
    setAllWorkouts(updatedAllWorkouts);
  };

  const updateWorkoutInList = (updatedWorkout) => {
    const updatedWorkouts = workouts.map((workout) =>
      workout._id === updatedWorkout._id ? updatedWorkout : workout
    );

    const updatedAllWorkouts = allWorkouts.map((workout) =>
      workout._id === updatedWorkout._id ? updatedWorkout : workout
    );

    setWorkouts(updatedWorkouts);
    setAllWorkouts(updatedAllWorkouts);
  };

  const handleUserChange = (userId) => {
    setSelectedUser(userId);

    if (userId === "") {
      setSelectedUserData(null);
      setWorkouts(allWorkouts);
    } else {
      const foundUser = users.find((user) => user._id === userId);
      setSelectedUserData(foundUser);

      const filteredWorkouts = allWorkouts.filter(
        (workout) => workout.userId?._id === userId
      );
      setWorkouts(filteredWorkouts);
    }
  };

  return (
    <div className="app">
      <Header />

      <UserFilter
        users={users}
        selectedUser={selectedUser}
        onUserChange={handleUserChange}
      />

      {selectedUserData && <UserDetails user={selectedUserData} />}

      <button
        className="toggle-user-form-button"
        onClick={() => setShowUserForm(!showUserForm)}
      >
        {showUserForm ? "Hide Add User Form" : "Show Add User Form"}
      </button>

      {showUserForm && <UserForm onAddUser={addUserToList} />}

      <WorkoutForm onAddWorkout={addWorkoutToList} users={users} />

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