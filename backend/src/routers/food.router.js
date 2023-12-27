import { Router } from "express";
import { sample_foods, sample_tags } from "../data.js";

const router = Router();

router.get("/", (_, res) => {
  res.send(sample_foods);
});

router.get("/tags", (_, res) => {
  res.send(sample_tags);
});

router.get("/search/:searchTerm", (req, res) => {
  const { searchTerm } = req.params;
  const data = sample_foods.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(data);
});

router.get("/tag/:tag", (req, res) => {
  const { tag } = req.params;
  const data = sample_foods.filter((item) => item.tags.includes(tag));
  res.send(data);
});

router.get("/:foodId", (req, res) => {
  const { foodId } = req.params;
  const data = sample_foods.find((item) => item.id.toString() === foodId);
  res.send(data);
});

export default router;
