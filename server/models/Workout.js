const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Workout title is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Workout date is required"],
    },
    durationMinutes: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    intensityLevel: {
      type: String,
      required: [true, "Intensity level is required"],
      enum: ["Low", "Medium", "High"],
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

workoutSchema.virtual("exercises", {
  ref: "Exercise",
  localField: "_id",
  foreignField: "workoutId",
});

module.exports = mongoose.model("Workout", workoutSchema);