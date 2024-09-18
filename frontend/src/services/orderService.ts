import axios from "axios";
import { OrderType } from "../types/types";

export const createOrder = async (order: OrderType & { name?: string }) => {
  const { data } = await axios.post("/api/orders/create ", order);
  return data;
};

export const getCurrentUserOrder = async () => {
  const { data } = await axios.get("/api/orders/currentUserOrder");
  return data;
};

export const pay = async (paymentId: string | number, tx_ref: string) => {
  const { data } = await axios.put("/api/orders/pay", { paymentId, tx_ref });
  return data;
};

export const cancel = async (id: string) => {
  const { data } = await axios.put(`/api/orders/cancel/${id}`);
  return data;
};

// export const trackOrderById = async (orderId: string) => {
//   const { data } = await axios.get("/api/orders/track/" + orderId);
//   return data;
// };

export const getAll = async (state?: string) => {
  const { data } = await axios.get(`/api/orders/${state ?? ""}`);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await axios.get(`/api/orders/allStatus`);
  return data;
};
