const Workout = require("../models/Workout");

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    console.error("GET /api/workouts error:", error);
    res.status(500).json({ message: "Failed to fetch workouts" });
  }
};

const createWorkout = async (req, res) => {
  try {
    const { title, date, durationMinutes, intensityLevel, notes, userId } =
      req.body;

    if (!title || !date || !durationMinutes || !intensityLevel || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const workout = await Workout.create({
      title,
      date,
      durationMinutes,
      intensityLevel,
      notes,
      userId,
    });

    res.status(201).json(workout);
  } catch (error) {
    console.error("POST /api/workouts error:", error);
    res.status(500).json({ message: "Failed to create workout" });
  }
};

module.exports = {
  getWorkouts,
  createWorkout,
};