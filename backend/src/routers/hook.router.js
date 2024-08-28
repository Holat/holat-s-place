import { Router } from "express";
import { OrderModel } from "../model/order.model.js";
import handler from "express-async-handler";
import log from "../logs/log.js";

const router = Router();
router.post(
  "/confirmPayment-flw",
  handler(async (req, res) => {
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
    const { status, id, customer } = data;

    log("orderLog.txt", `${JSON.stringify(req.body)}`);
    const order = await OrderModel.findOne({
      paymentId: id,
      email: customer.email,
    });

    if (!order){
      res.status(405).end();
      return
    };
    
    if (status === "successful" && event === "charge.completed") {
      order.status = "PAYED";
    } else {
      order.status = "FAILED";
    }
    await order.save();
    res.status(200).end();
  })
);

export default router;
