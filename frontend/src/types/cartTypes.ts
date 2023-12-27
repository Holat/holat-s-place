import { FoodItemType } from "./types";

interface CartFoodType {
  id: number | string;
  name: string;
  price: number;
  imageUrl: string;
}

export type CartItemType = {
  food: CartFoodType;
  quantity: number;
  price: number;
};

export type CartType = {
  items: CartItemType[];
  totalPrice: number;
  totalCount: number;
};

export type CartContextType = {
  cart: CartType;
  removeFromCart: (foodId: number | string) => void;
  changeQuantity: (cartItem: CartItemType, newQuantity: number) => void;
  addToCart: (food?: FoodItemType) => void;
  clearCart: () => void;
};
