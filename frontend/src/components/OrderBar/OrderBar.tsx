import Title from "../Title/Title";
import "./orderBar.scss";
import Price from "../Price/Price";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { NotFound } from "..";

export default function OrderBar({ isOpen }: { isOpen: boolean }) {
  const { cart, removeFromCart, changeQuantity } = useCart();
  const { items: orderItems } = cart;

  const navigate = useNavigate();

  return (
    <div className={`orderCont ${isOpen ? "" : "isClosed"}`}>
      <Title title="Cart Items" fontSize="24px" fontWeight={600} />
      <div className="details">
        <Title
          title="Delivery Address"
          fontSize={"12px"}
          fontWeight={500}
          opacity={0.8}
        />
        <Title title="Holat Street" fontSize="24px" fontWeight={700} />
      </div>
      {orderItems.length === 0 ? (
        <NotFound title="No Food Selected Yet" showBtn={false} />
      ) : (
        <div className="orderItems">
          {orderItems?.map((item) => (
            <div key={item.food.id} className="itemContainer">
              <div className="imageCont">
                <img
                  src={`/foods/${item.food.imageUrl}`}
                  alt={item.food.name}
                  loading="lazy"
                />
              </div>
              <div className="select">
                <div className="price">
                  <Title
                    title={item.food.name}
                    fontWeight={500}
                    fontSize={"16px"}
                  />
                  <Price price={item.price} />
                </div>
                <div className="select-wrapper">
                  <select
                    name="amount"
                    value={item.quantity}
                    onChange={(e) =>
                      changeQuantity(item, Number(e.target.value))
                    }
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                  <button onClick={() => removeFromCart(item.food.id)}>
                    <img src="/icons/delete.svg" alt="delete" />
                  </button>
                </div>
              </div>
            </div>
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
