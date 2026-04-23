const express = require("express");
const router = express.Router();

const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const {
  getExercisesByWorkoutId,
  createExercise,
} = require("../controllers/exerciseController");

router.get("/", getWorkouts);
router.get("/:id", getWorkoutById);

router.get("/:id/exercises", getExercisesByWorkoutId);
router.post("/:id/exercises", createExercise);

router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;