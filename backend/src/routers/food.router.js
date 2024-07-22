import { Router } from "express";
import handler from "express-async-handler";
import { FoodModel } from "../model/food.model.js";

const router = Router();

router.get(
  "/",
  handler(async (_, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
  })
);

router.get(
  "/topRatedFoods",
  handler(async (_, res) => {
    const foods = await FoodModel.find(
      { stars: { $gt: 4.5 } },
      {
        imageUrl: 1,
        stars: 1,
        price: 1,
        name: 1,
      }
    ).limit(6);
    res.send(foods);
  })
);

router.get(
  "/tags",
  handler(async (_, res) => {
    const aggregationPipeline = [
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ];

    const tags = await FoodModel.aggregate(aggregationPipeline);

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchR = new RegExp(searchTerm, "i");
    const data = await FoodModel.find({ name: { $regex: searchR } });
    res.send(data);
  })
);

router.get(
  "/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const data = await FoodModel.find({ tags: tag });
    res.send(data);
  })
);

router.get(
  "/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    const data = await FoodModel.findById(foodId);
    res.send(data);
  })
);

export default router;
