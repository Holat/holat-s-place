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
    const data = await FoodModel.find(
      { tags: tag },
      {
        imageUrl: 1,
        stars: 1,
        price: 1,
        name: 1,
      }
    );
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

//  {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     tags: { type: [String] },
//     favorite: { type: Boolean, default: false },
//     stars: { type: Number, default: 1 },
//     imageUrl: { type: String, required: true },
//     origins: { type: [String], required: true },
//     cookTime: { type: String, required: true },
//     desc: {
//       type: String,
//       default:
//         "Delicious meal with a perfect blend of flavors to satisfy your taste buds.",
//     },
//   },
export default router;
