import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import handler from "express-async-handler";
dotenv.config();
import foodRouter from "../src/routers/food.router.js";
import userRouter from "../src/routers/user.router.js";
import orderRouter from "../src/routers/order.router.js";
import { dbconnect } from "./config/database.config.js";
import handleSocketConnection from "./controllers/socketController.js";
dbconnect();

const app = express();
const io = new Server(3001, {
  cors: {
    credentials: true,
    origin: ["http://localhost:5173"],
  },
});

app.use(express.json());
app.use("/api/foods", foodRouter);
app.use("/api/user/", userRouter);
app.use("/api/orders", orderRouter);

io.on("connection", handleSocketConnection);

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log("Connection successful");
});
