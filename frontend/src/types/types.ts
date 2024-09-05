import { CartType, CartItemType } from "./cartTypes";

export type LinkType = {
  name: string;
  linkUrl: string;
  iconUrl: string;
  items?: number | null;
  currentPath?: boolean;
};

export type FoodType = {
  foods: FoodItemType[];
  tags: TagTypes[];
};

export type IAction =
  | { type: "FOODS_LOADED"; payload: FoodItemType[] }
  | { type: "TAGS_LOADED"; payload: TagTypes[] };

export type FoodItemType = {
  id: number | string;
  name: string;
  cookTime: number;
  price: number;
  favorite: boolean;
  origins: string[];
  stars: number;
  imageUrl: string;
  tags: string[];
  desc?: string;
};

export type FoodItemProp = {
  favorite: boolean;
  name: string;
  stars: number;
  price: number;
  imageUrl: string;
  id: string | number;
};

export interface TagTypes {
  name: string;
  // count: number;
}

export type LocationType = {
  currentAddress: string;
  lat: number;
  lng: number;
};

export type OrderType = {
  name?: string;
  address?: string;
  lat: number;
  lng: number;
  status?: string;
  tx_ref?: string;
} & CartType;

export type OrderHistoryType = {
  id: string;
  address: string;
  totalPrice: number;
  totalCount: number;
  createdAt: string;
  status: string;
  items: CartItemType[];
};

export type ItemCreateType = {
  name: string;
  price: number;
  tags: string[];
  imageUrl: File | string;
  origins: string[];
  cookTime: number;
  desc: string;
};

export type SelectType = {
  label: "";
  value: "";
};

export type AdminD = {
  origins: SelectType[];
  tags: SelectType[];
};

export type IAAction =
  | { type: "ORIGINS_LOADED"; payload: SelectType[] }
  | { type: "TAGS_LOADED"; payload: SelectType[] };

export type RevDetails = {
  totalRevenue: number;
  totalPaidOrders: number;
  totalPendingOrders: number;
  totalOrders: number;
};
