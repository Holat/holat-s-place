import "dotenv/config";
import express from "express";
import foodRouter from "../src/routers/food.router.js";
import userRouter from "../src/routers/user.router.js";
import orderRouter from "../src/routers/order.router.js";
import hookRouter from "./routers/hook.router.js";
import favouriteRouter from "./routers/favourite.router.js";
import adminRouter from "./routers/admin.router.js";
import { dbconnect } from "./config/database.config.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use("/api/foods", foodRouter);
app.use("/api/user/", userRouter);

app.use("/api/orders", orderRouter);
app.use("/api/hook", hookRouter);
app.use("/api/favourites", favouriteRouter);
app.use("/api/adminApi", adminRouter);

if (process.env.NODE_ENV !== "dev") {
  const publicFolder = path.join(__dirname, "public");
  app.use(express.static(publicFolder));
  app.get("*", (req, res) => {
    const indexFilePath = path.join(publicFolder, "index.html");
    res.sendFile(indexFilePath);
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Connection successful, Port =>", PORT);
});
