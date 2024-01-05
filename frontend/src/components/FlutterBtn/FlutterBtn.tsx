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
    public_key: "FLWPUBK_TEST-da1d63d048b80ff95f0ce22da86fdd21-X",
    tx_ref: `${Date.now()}_PMCK`,
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
    const orderId = await pay(paymentId);
    clearCart();
    closePaymentModal();
    toast.success("Payment Successful");
    navigate("/track/" + orderId);
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
      <Price price={order?.totalPrice || 0} />
      Pay
    </FlutterWaveButton>
  );
}
