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
  "/revDetails",
  handler(async (req, res) => {
    const orders = await OrderModel.find({ status: "PAYED" });
    const pending = await OrderModel.find({ status: "PENDING" });

    const getTotal = (orders) =>
      orders.reduce((total, order) => total + order.totalPrice, 0);

    const count = orders.length;
    const totalRev = getTotal(orders);
    const totalPending = getTotal(pending);

    res.send({ count, totalRev, totalPending });
  })
);

export default router;
// router.get('/monthly-sales', async (req, res) => {
//   try {
//     const currentYear = new Date().getFullYear();

//     const monthlySales = await Order.aggregate([
//       {
//         $match: {
//           status: 'payed',
//           createdAt: {
//             $gte: new Date(currentYear, 0, 1),
//             $lt: new Date(currentYear + 1, 0, 1)
//           }
//         }
//       },
//       {
//         $group: {
//           _id: { month: { $month: '$createdAt' } },
//           totalSales: { $sum: '$amount' },
//           orderCount: { $sum: 1 }
//         }
//       },
//       {
//         $sort: { '_id.month': 1 }  // Sort by month
//       }
//     ]);

//     // Format the data for easier consumption
//     const formattedData = monthlySales.map(item => ({
//       month: ${currentYear}-${item._id.month},
//       totalSales: item.totalSales,
//       orderCount: item.orderCount
//     }));

//     res.json(formattedData);
//   } catch (err) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// module.exports = router;
