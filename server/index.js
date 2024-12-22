import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Use import.meta.url to get the current directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// CORS setup for your frontend application
app.use(cors({
  origin: 'https://lms2-1-jaag.onrender.com', // Frontend URL
  credentials: true,
}));

// Parse incoming requests with JSON payloads
app.use(express.json());
app.use(cookieParser());

// Use Routes
app.use("/api/users", userRoute);
app.use("/api/courses", courseRoute);
app.use("/api/media", mediaRoute);
app.use("/api/purchase", purchaseRoute);
app.use("/api/progress", courseProgressRoute);

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
