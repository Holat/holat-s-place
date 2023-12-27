import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { CartContextType } from "../types/cartTypes";

export default function useCart() {
  return useContext(CartContext) as CartContextType;
}
