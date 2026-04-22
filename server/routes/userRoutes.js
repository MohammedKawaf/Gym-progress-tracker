const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getWorkoutsByUserId,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id/workouts", getWorkoutsByUserId);

module.exports = router;