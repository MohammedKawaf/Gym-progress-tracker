const express = require("express");
const router = express.Router();

const { getTotalReps } = require("../controllers/statsController");

router.get("/total-reps", getTotalReps);

module.exports = router;