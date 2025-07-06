import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js'; // <-- import DB connection function
import authRoutes from "./src/routes/auth.route.js"; // <-- import auth routes

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Running..."));
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));