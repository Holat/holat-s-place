import { Router } from "express";
import handler from "express-async-handler";
import { OrderModel } from "../model/order.model.js";
import { FoodModel } from "../model/food.model.js";
import auth from "../middleware/authMiddleware.js";
import adminAuth from "../middleware/adminAuthMiddleWare.js";

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
    const orders = await OrderModel.find().populate({
      path: "user",
      select: "name"
    }).sort("-createdAt");
    res.send(orders);
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
      const totalRevenue = await OrderModel.aggregate([
        { $match: { status: "PAID" } },
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
      ]);

      res.send({
        totalOrders,
        totalPaidOrders,
        totalPendingOrders,
        totalRevenue: totalRevenue[0].totalRevenue,
      });
    } catch (err) {
      console.error(err);
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
