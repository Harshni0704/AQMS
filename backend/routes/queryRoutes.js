const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/queryController");

// ===== ANALYTICS (Keep this ABOVE :id routes) =====
router.get("/analytics/summary", ctrl.getAnalyticsSummary);

// ===== MAIN ROUTES =====
router.get("/", ctrl.getQueries);           // Get all queries
router.post("/", ctrl.submitQuery);         // Create new query

router.get("/:id", ctrl.getQueryById);      // Get by ID
router.patch("/:id/status", ctrl.updateQueryStatus);   // Update status

router.patch("/:id/assign", ctrl.assignQuery);   // Assign user

router.delete("/:id", ctrl.deleteQuery);    // Delete

module.exports = router;