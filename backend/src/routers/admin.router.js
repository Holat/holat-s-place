import { Router } from "express";
import handler from "express-async-handler";
import { OrderModel } from "../model/order.model.js";
import { FoodModel } from "../model/food.model.js";
import auth from "../middleware/authMiddleware.js";
import adminAuth from "../middleware/adminAuthMiddleWare.js";
import { UserModel } from "../model/user.model.js";

const router = Router();
router.use([auth, adminAuth]);

router.post(
  "/createItem",
  handler(async (req, res) => {
    const item = req.body;
    const mapItems = (items) => items?.map((item) => item.value);
    const tags = mapItems(item.tags) || [""];
    const origins = mapItems(item.origins) || [""];
    const data = { ...item, tags, origins };

    const newItem = new FoodModel(data);
    await newItem.save();
    res.send({ success: true });
  })
);

router.get(
  "/orders",
  handler(async (req, res) => {
    const orders = await OrderModel.find()
      .populate({
        path: "user",
        select: "name",
      })
      .sort("-createdAt");
    res.send(orders);
  })
);

router.get(
  "/users",
  handler(async (req, res) => {
    const user = req.user;
    const users = await UserModel.find(
      { _id: { $ne: user.id } },
      {
        name: 1,
        email: 1,
        isAdmin: 1,
      }
    );
    res.send(users);
  })
);

router.put(
  "/updateFood",
  handler(async (req, res) => {
    try {
      const item = req.body;

      const mapItems = (items) => items?.map((item) => item.value);
      const tags = mapItems(item.tags) || [""];
      const origins = mapItems(item.origins) || [""];

      const data = { ...item, tags, origins };
      await FoodModel.findByIdAndUpdate(item._id, data, {
        new: true,
        runValidators: true,
      });
      res.status(200).send();
    } catch (error) {
      res.status(500).send({ message: "An Error occured" });
    }
  })
);

router.put(
  "/setAdmin",
  handler(async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await UserModel.findOne({ _id: userId });
      user.isAdmin = !user.isAdmin;
      user.save();
      res.send();
    } catch (error) {
      res.status(500).send({ message: "An Error occured" });
    }
  })
);

router.get(
  "/stats",
  handler(async (req, res) => {
    try {
      const totalOrders = await OrderModel.countDocuments();
      const totalPaidOrders = await OrderModel.countDocuments({
        status: "PAID",
      });
      const totalPendingOrders = await OrderModel.countDocuments({
        status: "PENDING",
      });
      const totalCancelledOrders = await OrderModel.countDocuments({
        status: "CANCELLED",
      });
      const totalRevenue = await OrderModel.aggregate([
        { $match: { status: "PAID" } },
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
      ]);

      res.send({
        totalOrders,
        totalPaidOrders,
        totalPendingOrders,
        totalCancelledOrders,
        totalRevenue: totalRevenue[0].totalRevenue,
      });
    } catch (err) {
      res.status(500).send({ message: "Error fetching stats" });
    }
  })
);

router.get("/monthly-sales", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const monthlySales = await OrderModel.aggregate([
      {
        $match: {
          status: "PAID",
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    // Format the data for easier consumption
    const formattedData = monthlySales.map((item) => ({
      month: `${item._id.month}-${currentYear}`,
      totalSales: item.totalSales,
      orderCount: item.orderCount,
    }));

    res.send(formattedData);
  } catch (err) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

export default router;
