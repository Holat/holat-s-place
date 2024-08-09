import { Router } from "express";
import handler from "express-async-handler";
import { OrderModel } from "../model/order.model.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();
router.use(auth);

router.post(
  "/createItem",
  handler(async (req, res) => {
    const item = req.body;

    const newItem = new FoodModel({ ...item });
    await newItem.save();
    res.send({ success: true });
  })
);

router.get(
  "/revDetails",
  handler(async (req, res) => {
    const orders = await OrderModel.find({ status: "PAYED" });

    const count = orders.length;
    const totalRev = orders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );

    res.send({ count, totalRev });
  })
);

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
