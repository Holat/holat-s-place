import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import { OrderModel } from "../model/order.model.js";
import handler from "express-async-handler";
import { UserModel } from "../model/user.model.js";

const router = Router();
router.use(auth);

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0) res.status(400).send("Cart Is Empty");

    await OrderModel.deleteOne({
      user: req.user.id,
      status: "NEW",
    });

    const newOrder = new OrderModel({
      ...order,
      user: req.user.id,
    });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.put(
  "/pay",
  handler(async (req, res) => {
    const { paymentId } = req.body;
    console.log(paymentId);
    const order = await getCurrentUserOrder(req);

    if (!order) {
      res.status(400).send("Order not found");
      return;
    }

    order.paymentId = paymentId;
    order.status = "PENDING";
    await order.save();

    res.send(order._id);
  })
);

router.get(
  "/currentUserOrder",
  handler(async (req, res) => {
    const order = await getCurrentUserOrder(req);

    if (order) res.send(order);
    else res.status(400).send();
  })
);

router.get(
  "/track/:orderId",
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = {
      _id: orderId,
    };

    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);
    if (!order) return res.sendStatus(401);
    return res.send(order);
  })
);

router.get(
  "/allStatus",
  handler(async (_, res) => {
    const allStatus = Object.values(Ord);
    res.send(allStatus);
  })
);

router.get(
  "/:status?",
  handler(async (req, res) => {
    const status = req.params.status;
    const user = await UserModel.findById(req.user.id);
    const filter = {};

    if (!user.isAdmin) filter.user = user._id;
    if (status) filter.status = { $regex: new RegExp(status, "i") };

    const orders = await OrderModel.find(filter).sort("-createdAt");
    res.send(orders);
  })
);

const getCurrentUserOrder = async (req, _) =>
  await OrderModel.findOne({
    user: req.user.id,
    status: "NEW",
  });

export default router;
