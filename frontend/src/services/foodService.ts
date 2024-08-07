import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("/api/foods/");
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get("/api/foods/tags");
  return data;
};

export const search = async (searchTerm: string) => {
  const { data } = await axios.get("/api/foods/search/" + searchTerm);
  return data;
};

export const getAllByTag = async (tag: string) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get("/api/foods/tag/" + tag);
  return data;
};

export const getById = async (foodId: string | number | undefined) => {
  const { data } = await axios.get("/api/foods/" + foodId);
  return data;
};

export const createItem = async (item: ItemCreateType) => {
  const { data } = await axios.post("/api/foods/create", item);
  return data.success;
};
