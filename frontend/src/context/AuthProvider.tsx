import { createContext, useState } from "react";
import * as userService from "../services/userService";
import { AuthContextType, UserType } from "../types/userTypes";
import { toast } from "react-toastify";
import { RegisterValues } from "../types/logTypes";
import { AxiosError } from "axios";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(userService.getUser());
  const login = async (email: string, password: string) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success("Login Successful");
    } catch (error) {
      const err = error as AxiosError;
      toast.error(typeof err.response?.data === "string" && err.response?.data);
    }
  };

  const register = async (data: RegisterValues) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success("Sign up successful!");
    } catch (error) {
      toast.error("Unsuccessful");
    }
  };

  /**
   *
   * @param type n: normal logout | t: token exp logout
   */
  const logout = (type: "n" | "t") => {
    userService.logout();
    setUser(null);

    type === "n"
      ? toast.success("Logout Successful")
      : toast.error("Session expired");
  };

  const updateProfile = async (user: UserType) => {
    const updatedUser = await userService.updateProfile(user);
    toast.success("Profile Updated");
    if (updatedUser) setUser(updatedUser);
  };

  const changePassword = async (passwords: string[]) => {
    await userService.changePassword(passwords);
    logout("n");
    toast.success("Password Changed!");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
