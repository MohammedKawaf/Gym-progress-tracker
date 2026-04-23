const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Exercise name is required"],
      trim: true,
    },
    sets: {
      type: Number,
      required: [true, "Sets are required"],
      min: [1, "Sets must be at least 1"],
    },
    reps: {
      type: Number,
      required: [true, "Reps are required"],
      min: [1, "Reps must be at least 1"],
    },
    workoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      required: [true, "Workout ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exercise", exerciseSchema);