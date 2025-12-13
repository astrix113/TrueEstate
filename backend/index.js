require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
// Ensure this filename matches exactly what you have in your folder
const salesRoutes = require("./routes/sales.route");

const app = express();

// --- FIX STARTS HERE ---
// Allow the Frontend to talk to the Backend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
// --- FIX ENDS HERE ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/api/sales", salesRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Retail Sales API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
