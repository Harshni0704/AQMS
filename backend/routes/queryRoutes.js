const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/queryController");

// ✅ Analytics Summary Route (must be BEFORE :id route)
router.get("/analytics/summary", ctrl.getAnalyticsSummary);

// Get all queries
router.get("/", ctrl.getQueries);

// Create new query
router.post("/", ctrl.submitQuery);

// Get by ID
router.get("/:id", ctrl.getQueryById);

// Update status
router.patch("/:id/status", ctrl.updateQueryStatus);

// Delete query
router.delete("/:id", ctrl.deleteQuery);

module.exports = router;