import { RegisterValues } from "./logTypes";

export type NewUserType = {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
};

export type UserType = NewUserType & {
  id: string | number;
  token: string;
};

export type AuthContextType = {
  user: UserType | null;
  login: (email: string, password: string) => void;
  register: (user: RegisterValues) => void;
  logout: () => void;
  updateProfile: (user: UserType) => void;
  changePassword: (passwords: string[]) => void;
};
