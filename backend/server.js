import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// ======= CORS (Render + Vercel + Localhost) =======
const allowedOrigins = [
  "https://aqms-698hn9p2m-harshnis-projects.vercel.app",  // Your frontend URL
  "https://aqms-nu.vercel.app",                          // Optional main domain
  "http://localhost:5173"                                // Dev mode
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.log("❌ CORS Blocked:", origin);
      return callback(new Error("CORS Not Allowed: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

// ================= ROOT CHECK =================
app.get("/", (req, res) => {
  res.send("✅ AQMS Backend is Running Successfully");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 10000;   // Render prefers dynamic + fallback

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});