import { ChangePassFormType, FormDetails, RegisterValues } from "./logTypes";

export type NewUserType = {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  isAdmin: boolean;
};

export type UserType = NewUserType & {
  id: string | number;
  token: string;
};

export type AuthContextType = {
  user: UserType | null;
  login: (email: string, password: string) => void;
  register: (user: RegisterValues) => void;
  logout: (type: "n" | "t") => void;
  updateProfile: (user: FormDetails) => void;
  changePassword: (passwords: ChangePassFormType) => void;
};
