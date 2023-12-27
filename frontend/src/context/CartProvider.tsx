import { createContext, useEffect, useState } from "react";
import { CartItemType, CartType, CartContextType } from "../types/cartTypes";
import { FoodItemType } from "../types/types";

export const CartContext = createContext<CartContextType | null>(null);
const CART_KEY = "holatPlaceCart";
const EMPTY_CART: CartType = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initCart = getLocalStorageCart();
  const [cartItems, setCartItems] = useState<CartItemType[]>(initCart.items);
  const [totalPrice, setTotalPrice] = useState<number>(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState<number>(initCart.totalCount);

  function getLocalStorageCart() {
    const localCart = localStorage.getItem(CART_KEY);
    return localCart ? JSON.parse(localCart) : EMPTY_CART;
  }

  const itemSum = (item: number[]) => item.reduce((prev, cur) => prev + cur, 0);

  useEffect(() => {
    const totalPrice = itemSum(
      cartItems.map((item: CartItemType) => item.price)
    );
    const totalCount = itemSum(
      cartItems.map((item: CartItemType) => item.quantity)
    );

    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      })
    );
  }, [cartItems]);

  const removeFromCart = (foodId: number | string) => {
    const filterCartItem = cartItems.filter(
      (item: CartItemType) => item.food.id !== foodId
    );

    setCartItems(filterCartItem);
  };

  const changeQuantity = (cartItem: CartItemType, newQuantity: number) => {
    const { food } = cartItem;
    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };

    setCartItems(
      cartItems.map((item: CartItemType) =>
        item.food.id === food.id ? changedCartItem : item
      )
    );
  };

  const addToCart = (food?: FoodItemType) => {
    if (!food) {
      return;
    }

    const cartItem = cartItems.find(
      (item: CartItemType) => item.food.id === food.id
    );

    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food?.price }]);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    const { items, totalPrice, totalCount } = EMPTY_CART;
    setCartItems(items);
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
