import "./CartPage.scss";
import { useNavigate } from "react-router-dom";
import { NotFound, OrderItem, Price, SearchBar, Title } from "../../components";
import useCart from "../../hooks/useCart";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart: { items, totalCount, totalPrice },
    removeFromCart,
    changeQuantity,
  } = useCart();

  const toggleOrderBar = () => {
    navigate("/cart");
  };

  return (
    <div className="cartCont">
      <SearchBar toggleOrderBar={toggleOrderBar} />
      {items.length === 0 ? (
        <NotFound title="Cart is Empty" showBtn />
      ) : (
        <>
          <div className="priceDet mobileDet">
            <p>Total</p>
            <Price price={totalPrice} />
          </div>
          <div className="detCont">
            <div className="cartItems detHC">
              <div className="cartItemsH">
                <Title title={`Cart(${totalCount})`} fontWeight={600} />
              </div>
              <div className="itemsC">
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
            </div>
            <div className="priceCont detHC">
              <div className="cartItemsH">
                <Title
                  title={`Cart Summary`}
                  fontSize="16px"
                  fontWeight={600}
                />
              </div>
              <div className="cartItemsH price">
                <div className="priceDet">
                  <p>No. of Items</p>
                  <Title title={`${totalCount}`} fontWeight={600} />
                </div>
                <div className="priceDet">
                  <p>Total</p>
                  <Price price={totalPrice} />
                </div>
              </div>
              <button className="btn" onClick={() => navigate("/checkout")}>
                Check Out
              </button>
            </div>
          </div>
          <div>
            <button
              className="btn mBtn"
              onClick={() => navigate("/checkout")}
              style={{ marginTop: "8px" }}
            >
              CHECKOUT (<Price price={totalPrice} />)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
