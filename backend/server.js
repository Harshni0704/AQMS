import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// ======= FIXED CORS (Works for Vercel + Render + Localhost) =======
const allowedOrigins = [
  "https://aqms-nu.vercel.app",                               // Your main frontend domain
  "https://aqms-my3ztswho-harshnis-projects.vercel.app",      // Your preview URL
  "http://localhost:5173"                                      // For local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow mobile/desktop apps or tools with no origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS Blocked Origin:", origin);
        callback(new Error("CORS blocked: " + origin));
      }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

// Preflight Support
app.options("*", cors());

// ================= ROUTES =================
import queryRoutes from "./routes/queryRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

app.use("/api/queries", queryRoutes);
app.use("/api/analytics", analyticsRoutes);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});