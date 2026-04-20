const express = require("express");
const router = express.Router();

const {
  getWorkoutsByUserId,
} = require("../controllers/userController");

router.get("/:id/workouts", getWorkoutsByUserId);

module.exports = router;