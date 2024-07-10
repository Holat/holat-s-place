import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import handler from "express-async-handler";
import { UserModel } from "../model/user.model.js";

const router = Router();
router.use(auth);

router.post(
  "/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    const user = await UserModel.findById(req.user.id);

    if (!user.favourites.includes(foodId)) {
      user.favourites.push(foodId);
      await user.save();
    }
    res.status(200).send(user.favourites);
  })
);

router.delete(
  "/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    const user = await UserModel.findById(req.user.id);

    user.favourites.pull(foodId);
    await user.save();
    res.status(200).send(user);
  })
);

router.get(
  "/id",
  handler(async (req, res) => {
    const user = await UserModel.findById(req.user.id).populate("favourites");
    res.status(200).send(user.favourites);
  })
);

router.get(
  "/",
  handler(async (req, res) => {
    const user = await UserModel.findById(req.user.id).populate("favourites");
    res.status(200).send(user.favourites);
  })
);

export default router;
