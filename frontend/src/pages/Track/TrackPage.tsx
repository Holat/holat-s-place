import { useParams } from "react-router-dom";
import "./trackPage.scss";
import { useEffect, useState } from "react";
import { trackOrderById } from "../../services/orderService";
import { NotFound } from "../../components";

export default function TrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    orderId &&
      trackOrderById(orderId).then((order) => {
        setOrder(order);
      });
  }, [orderId]);

  if (!orderId) {
    return <NotFound title="Order Not Found" />;
  }

  return (
    order && (
      <div className="orderTrackCont">
        <div>Order #{order._id}</div>
      </div>
    )
  );
}
