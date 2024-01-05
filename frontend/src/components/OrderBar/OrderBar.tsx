import Title from "../Title/Title";
import "./orderBar.scss";
import Price from "../Price/Price";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { NotFound, OrderItem } from "..";
import useAuth from "../../hooks/useAuth";

export default function OrderBar({ isOpen }: { isOpen: boolean }) {
  const { user } = useAuth();
  const { cart, removeFromCart, changeQuantity } = useCart();
  const { items: orderItems } = cart;

  const navigate = useNavigate();

  return (
    <div className={`orderCont ${isOpen ? "" : "isClosed"}`}>
      <Title title="Cart Items" fontSize="24px" fontWeight={600} />
      <div className="details">
        {user && (
          <div>
            <Title
              title="Delivery Address"
              fontSize={"12px"}
              fontWeight={500}
              opacity={0.8}
            />
            <Title title="Holat Street" fontSize="24px" fontWeight={700} />
          </div>
        )}
      </div>
      {orderItems.length === 0 ? (
        <NotFound title="No Food Selected Yet" showBtn={false} />
      ) : (
        <div className="orderItems">
          {orderItems?.map((item) => (
            <OrderItem
              key={item.food.id}
              show={true}
              item={item}
              changeQuantity={changeQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
      )}
      {orderItems.length !== 0 && (
        <div className="btnCont">
          <div className="total">
            <p>Total</p>
            <Price price={cart.totalPrice} />
          </div>
          <button onClick={() => navigate("/checkout")}>Check Out</button>
        </div>
      )}
    </div>
  );
}
