"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDB_1 = require("./database/connectDB");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Routes
app.get("/", (req, res) => {
    res.send("Hello, major project");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    (0, connectDB_1.initializeDatabase)();
});
