function UserDetails({ user }) {
  if (!user) {
    return null;
  }

  return (
    <div className="user-details">
      <h2>Selected User</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Height: {user.heightCm} cm</p>
      <p>Weight: {user.weightKg} kg</p>
      <p>Goal: {user.fitnessGoal}</p>
    </div>
  );
}

export default UserDetails;