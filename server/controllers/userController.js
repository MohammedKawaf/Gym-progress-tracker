const User = require("../models/User");
const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("GET /api/users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, age, heightCm, weightKg, fitnessGoal } = req.body;

    if (!name || !email || !age || !heightCm || !weightKg || !fitnessGoal) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.create({
      name,
      email,
      age: Number(age),
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      fitnessGoal,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("POST /api/users error:", error);
    res.status(500).json({ message: "Failed to create user" });
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

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const workouts = await Workout.find({ userId: req.params.id });
    const workoutIds = workouts.map((workout) => workout._id);

    await Exercise.deleteMany({ workoutId: { $in: workoutIds } });
    await Workout.deleteMany({ userId: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User and related workouts deleted",
    });
  } catch (error) {
    console.error("DELETE /api/users/:id error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  getUsers,
  createUser,
  getWorkoutsByUserId,
  deleteUser,
};