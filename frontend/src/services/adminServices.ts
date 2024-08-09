import axios from "axios";

export const createItem = async (item: ItemCreateType) => {
  const { data } = await axios.post("/adminApi/createItem", item);
  return data.success;
};

export const getOrderDetails = async () => {
  const { data } = await axios.get("/adminApi/revDetails");
  return data;
};
