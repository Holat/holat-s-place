import { RegisterValues } from "../types/logTypes";

const USER = "holatPlaceUser";

export const getUser = () => {
  const userString = localStorage.getItem(USER);
  return userString ? JSON.parse(userString) : null;
};

export const login = async (email: string, password: string) => {
  if (email === "holat@gmail.com" && password === "12345") {
    return {
      name: "Holat",
      email: "holat@gmail.com",
      password: "12345",
      address: "Holat Str",
      phone: "+234 701 756 2322",
      token: "errgerg",
    };
  } else return;
};

export const register = async (registerData: RegisterValues) => {
  const { lastName, firstName, email, password, address, mobileNumber } =
    registerData;

  const newData = {
    name: firstName + lastName,
    email,
    password,
    address,
    phone: mobileNumber,
    token: "2489r24rf23rf",
  };
  localStorage.setItem(USER, JSON.stringify(newData));
  return newData;
};

export const logout = () => {
  localStorage.removeItem(USER);
};
