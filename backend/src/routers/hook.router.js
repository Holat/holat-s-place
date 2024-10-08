import { Router } from "express";
import { OrderModel } from "../model/order.model.js";
import { ErrorLogModel } from "../model/errorLog.model.js";
import handler from "express-async-handler";
import log from "../logs/log.js";

const router = Router();
router.post(
  "/confirmPayment-flw",
  handler(async (req, res) => {
    try {
      const secretHash = process.env.FLW_HOOK_HASH;
      const signature = req.headers["verif-hash"];
      if (!signature || signature !== secretHash) {
        res.status(401).end();
        return;
      }

      if (!req.body.data || !req.body.event){
        res.status(405).json({message: "Request rejected"}).end();
        return;
      }
      const { event, data } = req.body;
      const { status, customer, tx_ref } = data;

      log("orderLog.txt", `${JSON.stringify(req.body)}`);
      const order = await OrderModel.findOne({
        tx_ref,
        status: "PENDING",
      }).populate({
        path: 'user', 
        match: { email: customer.email },
        select: 'email', 
      });

      if (order) {
        if (status === "successful" && event === "charge.completed") {
          order.status = "PAID";
        } else {
          order.status = "FAILED";
        }
        await order.save();
      }
      res.status(200).end();
    } catch (error) {
      await ErrorLogModel.create({
        message: error.message,
        stack: error.stack,
        route: "/confirmPayment-flw",
        timestamp: new Date(),
      });
    }
  })
);

export default router;
