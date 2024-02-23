import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import "./checkoutPage.scss";
import { useForm } from "react-hook-form";
import { OrderItem, Price, Title } from "../../components";
import Map from "../../components/Map/Map";
import { useNavigate } from "react-router-dom";
import { LocationType, OrderType } from "../../types/types";
import { toast } from "react-toastify";
import { createOrder } from "../../services/orderService";

type CheckoutType = {
  name: string;
  address: string;
  phone: string;
};

export default function CheckoutPage() {
  const { cart, changeQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderType>({
    ...cart,
    address: user?.address,
    lat: 0,
    lng: 0,
  });
  const navigate = useNavigate();
  const { setValue, register } = useForm<CheckoutType>();

  const handleSetLocation = (place: LocationType) => {
    place.currentAddress && setValue("address", place.currentAddress);
    setOrder({
      ...order,
      address: place.currentAddress,
      lat: place.lat,
      lng: place.lng,
    });
  };

  const onSubmit = async () => {
    if (order.lat === 0 && order.lng === 0) {
      toast.warning("Please select your location on the map", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    await createOrder({ ...order, name: user?.name });
    navigate("/payment");
  };

  return (
    <div className="checkoutContainer">
      <div className="header">
        <Title title="Checkout" fontSize="28px" fontWeight={700} />
      </div>
      <div className="contentContainer">
        <div className="content">
          <form id="hook-form" noValidate>
            <div className="inputs">
              <div className="input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  defaultValue={user?.name}
                />
              </div>
              <div className="input">
                <label htmlFor="name">Phone Number</label>
                <input
                  type="tel"
                  {...register("phone")}
                  defaultValue={user?.phone}
                />
              </div>
              <div className="input">
                <label htmlFor="name">Address</label>
                <input
                  type="address"
                  {...register("address")}
                  defaultValue={user?.address}
                />
              </div>
            </div>
          </form>
          <Map handleSetLocation={handleSetLocation} />
          <div className="items">
            {order.items.map((item) => (
              <OrderItem
                key={item.food.id}
                item={item}
                changeQuantity={changeQuantity}
                removeFromCart={removeFromCart}
                show={false}
              />
            ))}
          </div>
          <div className="btnCont">
            <div className="noItem">
              <Title title="No Of Items: " fontSize="16px" fontWeight={700} />
              <Title
                title={`${cart.totalCount}`}
                fontSize="18px"
                fontWeight={900}
              />
            </div>
            <div className="totalCont">
              <div className="total">
                <Title title="Total" fontSize="16px" fontWeight={700} />
                <Price price={cart.totalPrice} />
              </div>
              <button className="btn" onClick={onSubmit}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// onClick={() => navigate("/")}
