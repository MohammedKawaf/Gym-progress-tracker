const Workout = require("../models/Workout");

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
  getWorkoutsByUserId,
};