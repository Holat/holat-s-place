import axios from "axios";
import { ItemCreateType } from "../types/types";

export const createItem = async (item: ItemCreateType) => {
  const { data } = await axios.post("/api/adminApi/createItem", item);
  return data.success;
};

export const getOrderDetails = async () => {
  const { data } = await axios.get("/api/adminApi/stats");
  return data;
};

export const getMonthlySales = async () => {
  const { data } = await axios.get("/api/adminApi/monthly-sales");
  return data;
};

export const updateFoods = async(item: ItemCreateType) => {
  const { data } = await axios.put("/api/adminApi/updateFood", item);
  return data;
}

export const getOrders = async () => {
  const { data } = await axios.get("/api/adminApi/orders");
  return data;
};

export const getCountries = async () => {
  const { data } = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name"
  );

  return data
    ? data.map((country: {name: {common: string}}) => ({
        value: country.name.common,
        label: country.name.common,
      }))
    : [{ value: "", label: "" }];
};

export const getUsers = async() => {
  const {data} = await axios.get("/api/adminApi/users");
  return data;
}

export const setAdmin = async (userId: string) => {
  await axios.put("/api/adminApi/setAdmin", { userId});
}
