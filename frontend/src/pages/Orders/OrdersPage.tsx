import { useEffect, useState } from "react";
import "./orders.scss";
import { getAll } from "../../services/orderService";
import { Price, Title } from "../../components";
import { CartItemType } from "../../types/cartTypes";
import { toast } from "react-toastify";

type orderHistoryType = {
  _id: string;
  address: string;
  totalPrice: number;
  totalCount: number;
  items: CartItemType[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<orderHistoryType[]>();

  useEffect(() => {
    getAll()
      .then(setOrders)
      .catch(() => {
        toast.error("Something went wrong", { toastId: "swwe" });
      });
  }, []);

  return (
    <div className="ordersPageCont">
      <div className="orderItemsCont">
        {orders?.map((order) => (
          <div className="orderItemCont" key={order._id}>
            <div className="imgsCont">
              {order.items.map((item, i) => (
                <div
                  className={`imgCont`}
                  style={{
                    transform: `translateX(${i >= 0 && i <= 3 ? i * 25 : 0}%)`,
                    zIndex: -i + 10,
                  }}
                  key={item.food.id || i}
                >
                  <img
                    src={`${item.food.imageUrl}`}
                    alt={item.food.name}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* <div className="details"> */}
            {/* <Link to={`/track/${order._id}`}> */}
            <div className="orderId">
              <Title title={`#${order._id}`} fontSize={"16px"} />
            </div>
            {/* </Link> */}
            <Title title={`${order.totalCount}`} fontSize={"16px"} />
            <Price price={order.totalPrice} />
          </div>
          // </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <div className="btnCont">
{status.map((item: string) => (
  <button
    key={item}
    onClick={() => setCurrentStatus(item)}
    style={{
      border: item === currentStatus ? "1px solid #FA6400" : "none",
      backgroundColor: item === currentStatus ? "#ffe9d9" : "",
    }}
  >
    {item.toLowerCase()}
    {!item && "All"}
  </button>
))}
</div> */
}
