const express = require("express");
const router = express.Router();
const Query = require("../models/Query");

// GET /api/analytics/summary
router.get("/summary", async (req, res) => {
    try {
        const total = await Query.countDocuments();
        const pending = await Query.countDocuments({ status: "Pending" });
        const progress = await Query.countDocuments({ status: "In Progress" });
        const completed = await Query.countDocuments({ status: "Completed" });

        res.json({ total, pending, progress, completed });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Analytics error" });
    }
});

module.exports = router;