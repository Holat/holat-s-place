import express from "express";
import cors from "cors";

import foodRouter from "../src/routers/food.router.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use("/api/foods", foodRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Connection successful");
});
