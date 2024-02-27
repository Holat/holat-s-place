import "./orderItem.scss";
import { Title, Price } from "..";
import { CartItemType } from "../../types/cartTypes";

export default function OrderItem({
  item,
  changeQuantity,
  removeFromCart,
  show,
}: // style,
{
  item: CartItemType;
  removeFromCart?: (foodId: number | string) => void;
  changeQuantity?: (cartItem: CartItemType, newQuantity: number) => void;
  show: boolean;
  // style?: React.CSSProperties;
}) {
  return (
    <div key={item.food.id} className="itemContainer">
      <div className="imageCont">
        <img
          src={`${item.food.imageUrl}`}
          alt={item.food.name}
          loading="lazy"
        />
      </div>
      <div className="select">
        <div className="price">
          <Title title={item.food.name} fontWeight={500} fontSize={"16px"} />
          <Price price={item.price} />
        </div>
        <div className="select-wrapper">
          <select
            disabled={!show}
            name="amount"
            value={item.quantity}
            onChange={(e) =>
              changeQuantity && changeQuantity(item, Number(e.target.value))
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
          {show && (
            <button
              onClick={() => removeFromCart && removeFromCart(item.food.id)}
            >
              <img src="/icons/delete.svg" alt="delete" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
