import express from "express";
import cors from "cors";
import authRouter from "./apps/auth.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

async function init() {
  dotenv.config();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  const app = express();
  const port = 4000;

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/auth", authRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}

init();
