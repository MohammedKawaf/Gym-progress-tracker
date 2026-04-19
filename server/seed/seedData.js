const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");
const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Exercise.deleteMany();
    await Workout.deleteMany();
    await User.deleteMany();

    const users = await User.insertMany([
      {
        name: "Sara Lind",
        email: "sara.lind@gmail.com",
        age: 24,
        fitnessGoal: "Build strength",
      },
      {
        name: "Erik Holm",
        email: "erik.holm@gmail.com",
        age: 28,
        fitnessGoal: "Increase muscle mass",
      },
      {
        name: "Lina Svensson",
        email: "lina.svensson@gmail.com",
        age: 22,
        fitnessGoal: "Improve endurance",
      },
      {
        name: "David Karlsson",
        email: "david.karlsson@gmail.com",
        age: 30,
        fitnessGoal: "Lose body fat",
      },
      {
        name: "Emma Persson",
        email: "emma.persson@gmail.com",
        age: 26,
        fitnessGoal: "Stay active and healthy",
      },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: "Upper Body Strength",
        date: new Date("2026-04-10"),
        durationMinutes: 70,
        intensityLevel: "High",
        notes: "Focused on chest and shoulders",
        userId: users[0]._id,
      },
      {
        title: "Leg Day Power",
        date: new Date("2026-04-11"),
        durationMinutes: 80,
        intensityLevel: "High",
        notes: "Heavy squats and lunges",
        userId: users[1]._id,
      },
      {
        title: "Push Session",
        date: new Date("2026-04-12"),
        durationMinutes: 60,
        intensityLevel: "Medium",
        notes: "Moderate intensity push workout",
        userId: users[2]._id,
      },
      {
        title: "Pull Session",
        date: new Date("2026-04-13"),
        durationMinutes: 65,
        intensityLevel: "Medium",
        notes: "Back and biceps focus",
        userId: users[3]._id,
      },
      {
        title: "Full Body Hypertrophy",
        date: new Date("2026-04-14"),
        durationMinutes: 75,
        intensityLevel: "High",
        notes: "Balanced workout for overall growth",
        userId: users[4]._id,
      },
    ]);

    await Exercise.insertMany([
      {
        name: "Bench Press",
        sets: 4,
        reps: 8,
        weightKg: 60,
        muscleGroup: "Chest",
        workoutId: workouts[0]._id,
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: 10,
        weightKg: 22,
        muscleGroup: "Shoulders",
        workoutId: workouts[0]._id,
      },
      {
        name: "Squat",
        sets: 4,
        reps: 6,
        weightKg: 100,
        muscleGroup: "Legs",
        workoutId: workouts[1]._id,
      },
      {
        name: "Walking Lunges",
        sets: 3,
        reps: 12,
        weightKg: 16,
        muscleGroup: "Legs",
        workoutId: workouts[1]._id,
      },
      {
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weightKg: 24,
        muscleGroup: "Chest",
        workoutId: workouts[2]._id,
      },
      {
        name: "Triceps Pushdown",
        sets: 3,
        reps: 12,
        weightKg: 25,
        muscleGroup: "Triceps",
        workoutId: workouts[2]._id,
      },
      {
        name: "Lat Pulldown",
        sets: 4,
        reps: 10,
        weightKg: 55,
        muscleGroup: "Back",
        workoutId: workouts[3]._id,
      },
      {
        name: "Barbell Row",
        sets: 3,
        reps: 8,
        weightKg: 50,
        muscleGroup: "Back",
        workoutId: workouts[3]._id,
      },
      {
        name: "Deadlift",
        sets: 4,
        reps: 5,
        weightKg: 110,
        muscleGroup: "Back",
        workoutId: workouts[4]._id,
      },
      {
        name: "Leg Press",
        sets: 3,
        reps: 12,
        weightKg: 140,
        muscleGroup: "Legs",
        workoutId: workouts[4]._id,
      },
    ]);

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedData();