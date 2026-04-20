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

const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error("PUT /api/workouts/:id error:", error);
    res.status(500).json({ message: "Failed to update workout" });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
};