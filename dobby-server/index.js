const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const imgRouter = require("./routers/imgRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;

dotenv.config("./dot.env");

cloudinary.config({
  cloud_name: "djfo5hloh",
  api_key: "461488537141589",
  api_secret: "O3I4d-1C6QvCxdviWj3IRgTNQBw",
});

const app = express();

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// routes
app.use("/auth", authRouter);
app.use("/img", imgRouter);

app.get("/", (req, res) => {
  res.status(200).send("ok from server");
});

const PORT = process.env.PORT || 4000;

// function connects the mongodb
dbConnect();

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
