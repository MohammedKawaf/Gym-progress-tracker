function UserDetails({ user, onDeleteUser }) {
  if (!user) {
    return null;
  }

  const handleDeleteUser = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name} and all related workouts?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      onDeleteUser(user._id);
    } catch (error) {
      console.error("DELETE /api/users/:id error:", error);
    }
  };

  return (
    <div className="user-details">
      <h2>Selected User</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Height: {user.heightCm} cm</p>
      <p>Weight: {user.weightKg} kg</p>
      <p>Goal: {user.fitnessGoal}</p>

      <button className="delete-user-button" onClick={handleDeleteUser}>
        Delete User
      </button>
    </div>
  );
}

export default UserDetails;