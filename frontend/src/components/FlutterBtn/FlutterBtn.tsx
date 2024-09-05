import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import {
  FlutterWaveResponse,
  FlutterwaveConfig,
} from "flutterwave-react-v3/dist/types";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { OrderType } from "../../types/types";
import { Price } from "../../components";
import { toast } from "react-toastify";
import { pay } from "../../services/orderService";

export default function FlutterBtn({ order }: { order: OrderType }) {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const { cart } = useCart();

  const config: FlutterwaveConfig = {
    public_key: `${import.meta.env.VITE_FLUTTERWAVE_KEY}`,
    tx_ref: order.tx_ref || "flw_tx_ref",
    amount: cart.totalPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email || "",
      phone_number: user?.phone || "",
      name: order.name || "",
    },
    customizations: {
      title: "Holat's Place",
      description: "Payment for items in cart",
      logo: "/logo.png",
    },
  };

  const handlePayment = async (response: FlutterWaveResponse) => {
    if (response.status === "failed") {
      toast.error("Payment Failed");
      navigate("/payment");
    }

    const paymentId = response.transaction_id;
    await pay(paymentId);
    clearCart();
    closePaymentModal();
    toast.success("Payment Successful");
    navigate("/orders");
  };

  const fwConfig = {
    ...config,
    callback: handlePayment,
    onClose: () => {
      console.log("closed");
    },
  };

  return (
    <FlutterWaveButton className="flutterBtn" {...fwConfig}>
      Pay <Price price={order?.totalPrice} showP />
    </FlutterWaveButton>
  );
}
