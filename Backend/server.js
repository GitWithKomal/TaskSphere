const cors = require("cors");
require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.error("🔥 UNCAUGHT ERROR:");
  console.error(err.stack);
});

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/tasks");        // ← ADD THIS

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);                   // ← ADD THIS

app.get("/", (req, res) => {
  res.send("TaskSphere API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});