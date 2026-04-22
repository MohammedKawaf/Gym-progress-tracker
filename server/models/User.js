const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be at least 1"],
    },
    heightCm: {
      type: Number,
      required: [true, "Height is required"],
      min: [50, "Height must be at least 50 cm"],
    },
    weightKg: {
      type: Number,
      required: [true, "Weight is required"],
      min: [20, "Weight must be at least 20 kg"],
    },
    fitnessGoal: {
      type: String,
      required: [true, "Fitness goal is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);