import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
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
import { cancel, pay } from "../../services/orderService";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function FlutterBtn({ order }: { order: OrderType }) {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);

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
    try {
      if (response.status === "failed") {
        toast.error("Payment Failed");
        navigate("/payment");
      }
      const paymentId = response.transaction_id;
      await pay(paymentId, order.tx_ref || "");
      clearCart();
      toast.success("Payment Successful");
      navigate("/orders");
    } catch (error) {
      toast.error("Error making payment");
    }
    closePaymentModal();
  };

  const handleFlutterPayment = useFlutterwave(config);
  const handleBtnClick = () => {
    setLoading(true);
    handleFlutterPayment({
      callback: handlePayment,
      onClose: async () =>
        cancel(order._id || "")
          .then(() => toast.error("Error cancelling order"))
          .catch(() => toast("Error cancelling order"))
          .finally(() => navigate("/checkout")),
    });
  };

  return (
    <button className="flutterBtn" type="button" onClick={handleBtnClick}>
      {loading ? (
        <ThreeDots
          visible={true}
          height="16"
          width="40"
          color="#ffffff"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      ) : (
        <>
          Pay <Price price={order?.totalPrice} showP />
        </>
      )}
    </button>
  );
}
