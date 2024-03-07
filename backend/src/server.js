import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
import foodRouter from "../src/routers/food.router.js";
import userRouter from "../src/routers/user.router.js";
import orderRouter from "../src/routers/order.router.js";
import { dbconnect } from "./config/database.config.js";
import { createServer } from "http";
import socketInit from "./controllers/socket.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
const httpServer = createServer(app);
socketInit(httpServer);

app.use("/api/foods", foodRouter);
app.use("/api/user/", userRouter);
app.use("/api/orders", orderRouter);

const publicFolder = path.join(__dirname, "public");
app.use(express.static(publicFolder));
app.get("*", (req, res) => {
  const indexFilePath = path.join(publicFolder, "index.html");
  res.sendFile(indexFilePath);
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log("Connection successful");
});
