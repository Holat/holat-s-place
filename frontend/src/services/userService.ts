import axios from "axios";
import { RegisterValues } from "../types/logTypes";
import { UserType } from "../types/userTypes";

const USER = "holatPlaceUser";

export const getUser = () => {
  const userString = localStorage.getItem(USER);
  return userString ? JSON.parse(userString) : null;
};

export const login = async (email: string, password: string) => {
  const { data } = await axios.post("/api/user/login", { email, password });
  localStorage.setItem(USER, JSON.stringify(data));
  return data;
};

export const register = async (registerData: RegisterValues) => {
  const { data } = await axios.post("/api/user/register", registerData);
  localStorage.setItem(USER, JSON.stringify(data));
  return data;
};

export const updateProfile = async (user: UserType) => {
  const { data } = await axios.put("/api/user/updateProfile", user);
  localStorage.setItem(USER, JSON.stringify(data));
  return data;
};

export const changePassword = async (passwords: string[]) => {
  await axios.put("/api/user/changePassword", passwords);
};

export const logout = () => {
  localStorage.removeItem(USER);
};
