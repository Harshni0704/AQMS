const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/queryController");

// ===============================
// ANALYTICS
// ===============================
router.get("/analytics/summary", ctrl.getAnalyticsSummary);

// ===============================
// MAIN ROUTES
// ===============================
router.get("/", ctrl.getQueries);
router.post("/", ctrl.submitQuery);

// ===============================
// GET BY ID
// ===============================
router.get("/:id", ctrl.getQueryById);

// ===============================
// UPDATE FULL QUERY (EDIT)
// ===============================
router.put("/:id", ctrl.updateQuery);

// ===============================
// UPDATE STATUS
// ===============================
router.put("/:id/status", ctrl.updateQueryStatus);
router.patch("/:id/status", ctrl.updateQueryStatus);

// ===============================
// ASSIGN USER
// ===============================
router.put("/:id/assign", ctrl.assignQuery);
router.patch("/:id/assign", ctrl.assignQuery);

// ===============================
// DELETE
// ===============================
router.delete("/:id", ctrl.deleteQuery);

module.exports = router;