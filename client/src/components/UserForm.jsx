import { useState } from "react";

function UserForm({ onAddUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    heightCm: "",
    weightKg: "",
    fitnessGoal: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("");

      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const newUser = await response.json();
      onAddUser(newUser);

      setFormData({
        name: "",
        email: "",
        age: "",
        heightCm: "",
        weightKg: "",
        fitnessGoal: "",
      });
    } catch (error) {
      console.error("POST /api/users error:", error);
      setErrorMessage("Could not create user");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Add User</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="heightCm"
        placeholder="Height in cm"
        value={formData.heightCm}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="weightKg"
        placeholder="Weight in kg"
        value={formData.weightKg}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="fitnessGoal"
        placeholder="Fitness goal"
        value={formData.fitnessGoal}
        onChange={handleChange}
        required
      />

      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;