import { useState } from "react";

function UserDetails({ user, onDeleteUser }) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  if (!user) {
    return null;
  }

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      onDeleteUser(user._id);
      setShowDeletePopup(false);
    } catch (error) {
      console.error("DELETE /api/users/:id error:", error);
    }
  };

  return (
    <>
      <div className="user-details">
        <h2>Selected User</h2>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Height: {user.heightCm} cm</p>
        <p>Weight: {user.weightKg} kg</p>
        <p>Goal: {user.fitnessGoal}</p>

        <button
          className="delete-user-button"
          onClick={() => setShowDeletePopup(true)}
        >
          Delete User
        </button>
      </div>

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Delete User?</h3>
            <p>
              Are you sure you want to delete <strong>{user.name}</strong> and all
              related workouts?
            </p>

            <div className="popup-buttons">
              <button
                className="cancel-popup-button"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-button"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetails;