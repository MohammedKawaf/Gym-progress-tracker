const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getWorkoutsByUserId,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id/workouts", getWorkoutsByUserId);
router.delete("/:id", deleteUser);

module.exports = router;