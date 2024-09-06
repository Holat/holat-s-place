import { useContext } from "react";
import { FoodContext } from "../context/FoodProvider";
import { FoodContextType } from "../types/types";

export default function useFood() {
  return useContext(FoodContext) as FoodContextType;
}
