import axios from "axios";
import { ItemCreateType } from "../types/types";

export const createItem = async (item: ItemCreateType) => {
  const { data } = await axios.post("/adminApi/createItem", item);
  return data.success;
};

export const getOrderDetails = async () => {
  const { data } = await axios.get("/adminApi/revDetails");
  return data;
};

export const getCountries = async () => {
  const { data } = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name"
  );

  return data
    ? data.map((country: any) => ({
        value: country.name.common,
        label: country.name.common,
      }))
    : [{ value: "", label: "" }];
};
