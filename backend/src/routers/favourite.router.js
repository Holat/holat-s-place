import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import handler from "express-async-handler";

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
    res.status(200).send(user);
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
  "/",
  handler(async (req, res) => {
    const user = await UserModel.findById(req.user.id).populate("favorites");
    res.status(200).send(user.favourites);
  })
);

export default router;