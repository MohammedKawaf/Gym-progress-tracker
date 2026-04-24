# Gym Progress Tracker

A full-stack web application for managing gym users, workouts, and exercises.

Users can create profiles, add workouts, connect workouts to users, and manage exercises inside each workout.

---

# Features

- Create, view and delete users
- Create, edit and delete workouts
- Filter workouts by selected user
- Show user details
- Add exercises to workouts
- Delete exercises
- Responsive and clean UI
- Connected MongoDB database

---

# Tech Stack

## Frontend
- React
- Vite
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Tools
- Postman
- Git & GitHub

---

# Installation

## Clone project

```bash
git clone https://github.com/MohammedKawaf/Gym-progress-tracker.git
cd Gym-progress-tracker
```

## Install dependencies

```bash
npm install
cd client
npm install
cd ..
```

## Add environment variables

Create a `.env` file inside `/server`

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Run project

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

---

# API Routes

## Users
- GET /api/users
- POST /api/users
- DELETE /api/users/:id

## Workouts
- GET /api/workouts
- GET /api/workouts/:id
- POST /api/workouts
- PUT /api/workouts/:id
- DELETE /api/workouts/:id

## Exercises
- GET /api/workouts/:id/exercises
- POST /api/workouts/:id/exercises
- DELETE /api/workouts/:id/exercises/:exerciseId

## Stats
- GET /api/stats/total-reps

---

# Project Structure

```text
client/
  src/
    components/
    App.jsx
    App.css

server/
  controllers/
  models/
  routes/
  config/
  server.js
```

---

# Future Improvements

- Edit users
- Search function
- Better statistics dashboard
- Authentication
- Dark mode

---

# Author

Created as a school project using React, Node.js, Express and MongoDB.