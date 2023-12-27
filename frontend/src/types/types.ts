export type LinkType = {
  name: string;
  linkUrl: string;
  iconUrl: string;
  items?: number | null;
  currentPath?: boolean;
};

export type FoodType = {
  foods: OrderItemType[];
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

export type OrderItemType = {
  id: number | string;
  name: string;
  cookTime: number;
  price: number;
  favorite: boolean;
  origins: string[];
  stars: number;
  imageUrl: string;
  tags: string[];
};

export interface TagTypes {
  name: string;
  // count: number;
}
