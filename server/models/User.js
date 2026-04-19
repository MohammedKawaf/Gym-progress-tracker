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
      min: [16, "Age must be at least 16"],
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