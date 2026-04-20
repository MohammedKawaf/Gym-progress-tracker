const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Gym Progress Tracker API is running" });
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});