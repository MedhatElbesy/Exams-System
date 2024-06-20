const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const resultRoutes = require("./routes/resultRoutes");
const questionRoutes = require("./routes/questionRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/questions", questionRoutes);

const port = process.env.PORT || 8000;
const mongoDBURL = process.env.mongoDBURL;

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Database is connected");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Database is not connected ${error}`);
  });

module.exports = app;
