import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import foodRouter from "../src/routers/food.router.js";
import userRouter from "../src/routers/user.router.js";
import orderRouter from "../src/routers/order.router.js";

import { dbconnect } from "./config/database.config.js";
dbconnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/user/", userRouter);
app.use("/api/orders", orderRouter);

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log("Connection successful");
});
