const Query = require("../models/Query");
const { parsePagination } = require("../utils/pagination");

// =======================================================
// GET ALL QUERIES
// =======================================================
async function getQueries(req, res) {
  try {
    const { search, type, priority, status, channel, sortBy } = req.query;
    const { skip, limit, page } = parsePagination(req.query);

    const filter = {};

    if (type) filter.type = type;
    if (priority) filter.priority = priority;
    if (status) filter.status = status;
    if (channel) filter.channel = channel;

    // GLOBAL SEARCH
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];

      if (search.length === 24) {
        filter.$or.push({ _id: search });
      }
    }

    let cursor = Query.find(filter).skip(skip).limit(limit);

    cursor =
      sortBy === "priority"
        ? cursor.sort({ priority: -1 })
        : cursor.sort({ createdAt: -1 });

    const items = await cursor;
    const total = await Query.countDocuments(filter);

    res.json({ page, limit, total, items });
  } catch (err) {
    console.error("getQueries error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// =======================================================
// GET QUERY BY ID
// =======================================================
async function getQueryById(req, res) {
  try {
    const doc = await Query.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// =======================================================
// CREATE NEW QUERY
// =======================================================
async function submitQuery(req, res) {
  try {
    const created = await Query.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// =======================================================
// UPDATE FULL QUERY (EDIT POPUP SAVE BUTTON)
// =======================================================
async function updateQuery(req, res) {
  try {
    const updated = await Query.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating query" });
  }
}

// =======================================================
// UPDATE STATUS ONLY
// =======================================================
async function updateQueryStatus(req, res) {
  try {
    const updated = await Query.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating status" });
  }
}

// =======================================================
// ASSIGN QUERY
// =======================================================
async function assignQuery(req, res) {
  try {
    const updated = await Query.findByIdAndUpdate(
      req.params.id,
      { assignedTo: req.body.assignedTo },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error assigning query" });
  }
}

// =======================================================
// DELETE QUERY
// =======================================================
async function deleteQuery(req, res) {
  try {
    const deleted = await Query.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Not found" });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// =======================================================
// ANALYTICS SUMMARY
// =======================================================
async function getAnalyticsSummary(req, res) {
  try {
    const total = await Query.countDocuments();
    const pending = await Query.countDocuments({ status: "open" });
    const inProgress = await Query.countDocuments({ status: "in_progress" });
    const resolved = await Query.countDocuments({ status: "resolved" });

    res.json({ total, pending, inProgress, resolved });
  } catch (err) {
    res.status(500).json({ error: "Error generating summary" });
  }
}

module.exports = {
  submitQuery,
  getQueries,
  getQueryById,
  updateQuery,
  updateQueryStatus,
  assignQuery,
  deleteQuery,
  getAnalyticsSummary,
};