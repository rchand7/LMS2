import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Connect to the database
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1); // Exit the process if DB connection fails
});

// Port configuration
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// CORS configuration: Allowing only specific origins
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", // Update based on environment
    credentials: true,
  })
);

// API routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// Serve static files from frontend build directory
app.use(express.static(path.join(__dirname, "client", "dist")));

// Catch-all route to serve the frontend's index.html file
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Global error handler for unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
