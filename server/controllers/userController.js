const User = require("../models/User");
const Workout = require("../models/Workout");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("GET /api/users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const getWorkoutsByUserId = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.id });

    res.status(200).json(workouts);
  } catch (error) {
    console.error("GET /api/users/:id/workouts error:", error);
    res.status(500).json({ message: "Failed to fetch user workouts" });
  }
};

module.exports = {
  getUsers,
  getWorkoutsByUserId,
};