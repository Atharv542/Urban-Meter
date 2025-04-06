import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

// config
dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve(); // typo fixed: _dirname ➜ __dirname

// ✅ Add CORS middleware at the very top before any routes
app.use(cors({
  origin: "https://urban-meter-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);

// Serve frontend (optional if needed)
app.use(express.static(path.join(__dirname, "myapp/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "myapp/dist", "index.html"));
});

// Root test route
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

// Port setup
const PORT = process.env.VITE_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
export default app;


