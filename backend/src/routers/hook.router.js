import { Router } from "express";
import { OrderModel } from "../model/order.model.js";
import handler from "express-async-handler";
import { UserModel } from "../model/user.model.js";
import log from "../logs/log.js"

const router = Router();
router.post("/confirmPayment-flw", 
    handler(async (req, res) => {
        const secretHash = process.env.FLW_SECRET_HASH;
        const signature = req.headers["verif-hash"];
        if (!signature || (signature !== secretHash)) {
            res.status(401).end();
        }
        const { event, data } = req.body;
        const { status,id, customer } = data;

        log('orderLog.txt', {`${JSON.stringify(req.body)}-------\n`});
        const order = await OrderModel.findOne({
            paymentId: id
            email: customer.email,
        });
        if !(order) return;
        if ( status === "successful" && even === "charge.completed"){
            order.status = "PAYED";
        } esle {
            order.status = "FAILED";
        }
        await order.save();
        res.status(200).end();
    })
);

// Demo payload return from webhook
// {
//   "event": "charge.completed",
//   "data": {
//     "id": 285959875,
//     "tx_ref": "Links-616626414629",
//     "flw_ref": "PeterEkene/FLW270177170",
//     "device_fingerprint": "a42937f4a73ce8bb8b8df14e63a2df31",
//     "amount": 100,
//     "currency": "NGN",
//     "charged_amount": 100,
//     "app_fee": 1.4,
//     "merchant_fee": 0,
//     "processor_response": "Approved by Financial Institution",
//     "auth_model": "PIN",
//     "ip": "197.210.64.96",
//     "narration": "CARD Transaction ",
//     "status": "successful",
//     "payment_type": "card",
//     "created_at": "2020-07-06T19:17:04.000Z",
//     "account_id": 17321,
//     "customer": {
//       "id": 215604089,
//       "name": "Yemi Desola",
//       "phone_number": null,
//       "email": "user@gmail.com",
//       "created_at": "2020-07-06T19:17:04.000Z"
//     },
//     "card": {
//       "first_6digits": "123456",
//       "last_4digits": "7889",
//       "issuer": "VERVE FIRST CITY MONUMENT BANK PLC",
//       "country": "NG",
//       "type": "VERVE",
//       "expiry": "02/23"
//     }
//   }
// }

export default router;