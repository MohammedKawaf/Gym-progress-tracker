const Workout = require("../models/Workout");
const User = require("../models/User");
const Exercise = require("../models/Exercise");

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find()
      .populate("userId", "name fitnessGoal")
      .populate("exercises", "name sets reps");

    res.status(200).json(workouts);
  } catch (error) {
    console.error("GET /api/workouts error:", error);
    res.status(500).json({ message: "Failed to fetch workouts" });
  }
};

const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error("GET /api/workouts/:id error:", error);
    res.status(500).json({ message: "Failed to fetch workout" });
  }
};

const createWorkout = async (req, res) => {
  try {
    const { title, date, durationMinutes, intensityLevel, userId } = req.body;

    if (!title || !date || !durationMinutes || !intensityLevel || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const workout = await Workout.create({
      title,
      date,
      durationMinutes,
      intensityLevel,
      userId,
    });

    res.status(201).json(workout);
  } catch (error) {
    console.error("POST /api/workouts error:", error);
    res.status(500).json({ message: "Failed to create workout" });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error("PUT /api/workouts/:id error:", error);
    res.status(500).json({ message: "Failed to update workout" });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted" });
  } catch (error) {
    console.error("DELETE /api/workouts/:id error:", error);
    res.status(500).json({ message: "Failed to delete workout" });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};