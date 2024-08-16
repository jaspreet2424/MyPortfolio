const express = require("express");
const  router  = require("./Routes/User");
const app = express();
const cookieParser = require("cookie-parser");
const cloudinary = require('cloudinary').v2;
const cors = require("cors");
const connectDatabase = require("./Database");
require("dotenv").config();
const port = process.env.PORT;

connectDatabase();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
    origin: "http://localhost:5173",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`MyPortfolio Server is running at port ${port}`);
});
