const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/queryController");

// ALL ROUTES MUST POINT TO VALID FUNCTIONS

router.get("/", ctrl.getQueries);            // list
router.post("/submit", ctrl.submitQuery);    // create
router.get("/:id", ctrl.getQueryById);       // get one
router.put("/:id/status", ctrl.updateQueryStatus); // update only status
router.delete("/:id", ctrl.deleteQuery);     // delete

module.exports = router;
