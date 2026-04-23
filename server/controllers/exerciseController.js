const Exercise = require("../models/Exercise");

const getExercisesByWorkoutId = async (req, res) => {
  try {
    const exercises = await Exercise.find({ workoutId: req.params.id });

    res.status(200).json(exercises);
  } catch (error) {
    console.error("GET /api/workouts/:id/exercises error:", error);
    res.status(500).json({ message: "Failed to fetch exercises" });
  }
};

const createExercise = async (req, res) => {
  try {
    const { name, sets, reps } = req.body;

    if (!name || !sets || !reps) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exercise = await Exercise.create({
      name,
      sets: Number(sets),
      reps: Number(reps),
      workoutId: req.params.id,
    });

    res.status(201).json(exercise);
  } catch (error) {
    console.error("POST /api/workouts/:id/exercises error:", error);
    res.status(500).json({ message: "Failed to create exercise" });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.exerciseId);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json({ message: "Exercise deleted" });
  } catch (error) {
    console.error("DELETE /api/workouts/:id/exercises/:exerciseId error:", error);
    res.status(500).json({ message: "Failed to delete exercise" });
  }
};

module.exports = {
  getExercisesByWorkoutId,
  createExercise,
  deleteExercise,
};