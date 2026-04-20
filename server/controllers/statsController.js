const Exercise = require("../models/Exercise");

const getTotalReps = async (req, res) => {
  try {
    const exercises = await Exercise.find();

    let totalReps = 0;

    for (let i = 0; i < exercises.length; i++) {
      totalReps += exercises[i].sets * exercises[i].reps;
    }

    res.status(200).json({ totalReps });
  } catch (error) {
    console.error("GET /api/stats/total-reps error:", error);
    res.status(500).json({ message: "Failed to fetch total reps" });
  }
};

module.exports = {
  getTotalReps,
};