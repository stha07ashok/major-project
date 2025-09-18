import express from "express";
import { initializeDatabase } from "./database/connectDB";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// Routes
app.get("/", (req, res) => {
  res.send("Hello, major project");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  initializeDatabase();
});
