const express = require("express");
const router = express.Router();

const {
  getUsers,
  getWorkoutsByUserId,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id/workouts", getWorkoutsByUserId);

module.exports = router;