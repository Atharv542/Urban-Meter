import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"
import {Server} from "socket.io"
import http from "http";

//configure env
dotenv.config();
//databse config
connectDB();



//rest object
const app = express();
const _dirname=path.resolve();
//middelwares
app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.1.1:5173"], // Replace with YOUR IP
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
//routes
app.use("/api/v1/auth", authRoutes);
app.use(express.static(path.join(_dirname, "../myapp/dist")));


app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/socket.io")) return;
  res.sendFile(path.join(_dirname, "../myapp/dist", "index.html"));
});
const server = http.createServer(app);

// ✅ Setup Socket.IO AFTER CORS and express.json
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
    credentials: true,
  },
});


// ✅ Socket.IO listeners
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("incomingCall", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/log-call", (req, res) => {
  const { from, to } = req.body;
  console.log(`Logging call: From ${from} To ${to}`);
  res.json({ success: true, message: "Call logged successfully" });
});



//rest api

const PORT = process.env.PORT || 8080;
server.listen(PORT, 8080, () => {
  console.log(
    `Server Running on ${process.env.MONGO_URL} mode on port ${PORT}`
  );
});




// ✅ Export the app for Vercel
export default app;

