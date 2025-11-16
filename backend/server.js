// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const queryRoutes = require('./routes/queryRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ------------ FIXED CORS (FINAL VERSION) ------------
app.use(cors({
  origin: [
    "https://aqms-nu.vercel.app",
    "https://aqms-git-main-harshnis-projects.vercel.app",
    "https://aqms-my3ztswho-harshnis-projects.vercel.app",
    "http://localhost:5173"
  ],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
}));

app.options("*", cors()); // Preflight

// Middleware
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/queries", queryRoutes);
app.use("/api/analytics", analyticsRoutes);

// Health Check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));