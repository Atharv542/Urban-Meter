import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"

//configure env
dotenv.config();
//databse config
connectDB();



//rest object
const app = express();
const _dirname=path.resolve();
//middelwares
app.use(cors({
  origin: ["https://urban-meter-frontend.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
//routes
app.use("/api/v1/auth", authRoutes);
app.use(express.static(path.join(_dirname,"myapp/dist")));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(_dirname, 'myapp/dist', 'index.html'))
});



//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome </h1>");
});

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_PLACE_API_KEY; // Store API key in .env file

app.get("/api/place-details", async (req, res) => {
  try {
    const { input } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
      {
        params: {
          input,
          inputtype: "textquery",
          fields: "place_id",
          key: GOOGLE_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching place details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//PORT
const PORT = process.env.VITE_PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.VITE_MONGO_URL} mode on port ${PORT}`
  );
});
module.exports = app;
