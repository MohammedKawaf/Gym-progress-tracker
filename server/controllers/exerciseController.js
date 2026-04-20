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

module.exports = {
  getExercisesByWorkoutId,
};