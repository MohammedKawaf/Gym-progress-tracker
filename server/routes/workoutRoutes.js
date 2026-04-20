const express = require("express");
const router = express.Router();

const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

router.get("/", getWorkouts);
router.get("/:id", getWorkoutById);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);

module.exports = router;