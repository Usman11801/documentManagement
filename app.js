const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/database");
const errorMiddleware = require("./middlewares/errorMiddleware");

// Import routes
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

// Middleware
app.use(express.json());

// Connect to database
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
