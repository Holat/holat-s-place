import "./payment.scss";
import { useEffect, useState } from "react";
import { FlutterBtn, Price, Title } from "../../components";
import { getCurrentUserOrder } from "../../services/orderService";
import { OrderType } from "../../types/types";

export default function PaymentPage() {
  const [order, setOrder] = useState<OrderType>();

  useEffect(() => {
    getCurrentUserOrder().then((data) => setOrder(data));
  }, []);

  if (!order) return;

  return (
    <div className="paymentCont">
      <div className="header">
        <div className="infoCont">
          <div className="profile">
            <div className="img">
              <img src="/icon.jpeg" alt="profile picture" />
            </div>
            <Title title={order?.name} fontSize="20px" fontWeight={800} />
          </div>
          <div className="address">
            <Title title="Address" fontWeight={700} opacity={0.45} />
            <Title title={order?.address} fontWeight={700} />
          </div>
        </div>
        <div className="orders head">
          <div
            className="order"
            style={{
              backgroundColor: "coral",
              border: "none",
              color: "white",
            }}
          >
            <div style={{ marginLeft: "20px" }}>
              <Title title="Name" fontSize="16px" fontWeight={700} />
            </div>
            <Title title="Quantity" fontSize="16px" fontWeight={700} />
            <Title title="Price(Naira)" fontSize="16px" fontWeight={700} />
          </div>
        </div>
      </div>
      <div className="orders">
        {order &&
          order.items.map((item) => (
            <div key={item.food.id} className="order">
              <div className="titleCont">
                <div className="imgCont">
                  <img src={`${item.food.imageUrl}`} alt={item.food.name} />
                </div>
                <div>
                  <Title
                    title={item.food.name}
                    fontSize="16px"
                    fontWeight={600}
                  />
                  <div className="mobileP">
                    <Price price={item.price} /> ({item.quantity})
                  </div>
                </div>
              </div>
              <p>{item.quantity}</p>

              <Price price={item.price} />
            </div>
          ))}
        <div className="totalCont">
          <div className="order" style={{}}>
            <Title title="Total" fontSize="20px" fontWeight={800} />
            <p>{order?.totalCount}</p>
            {order && <FlutterBtn order={order} />}
          </div>
        </div>
      </div>
    </div>
  );
}
