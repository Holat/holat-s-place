import Title from "../Title/Title";
import "./orderBar.scss";
import Price from "../Price/Price";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { NotFound, OrderItem } from "..";
import useAuth from "../../hooks/useAuth";
import { closeIcon } from "../../assets/icons";

export default function OrderBar({
  isOpen,
  toggleOrderBar,
}: {
  isOpen: boolean;
  toggleOrderBar: () => void;
}) {
  const { user } = useAuth();
  const {
    cart: { items, totalPrice },
    removeFromCart,
    changeQuantity,
  } = useCart();
  const navigate = useNavigate();

  return (
    <div className={`orderCont ${isOpen ? "" : "isClosed"}`}>
      <div className="orderHeader">
        <Title title="Cart Items" fontSize="24px" fontWeight={600} />
        <button onClick={toggleOrderBar}>
          <img src={ closeIcon } alt="close" />
        </button>
      </div>
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
      {items.length === 0 ? (
        <NotFound title="No Food Selected Yet" showBtn={false} />
      ) : (
        <div className="orderItems">
          {items?.map((item) => (
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
      {items.length !== 0 && (
        <div className="btnCont">
          <div className="total">
            <p>Total</p>
            <Price price={totalPrice} />
          </div>
          <button onClick={() => navigate("/checkout")}>Check Out</button>
        </div>
      )}
    </div>
  );
}
