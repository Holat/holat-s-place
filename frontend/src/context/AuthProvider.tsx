import { createContext, useState } from "react";
import * as userService from "../services/userService";
import { AuthContextType, UserType } from "../types/userTypes";
import { toast } from "react-toastify";
import {
  RegisterValues,
  FormDetails,
  ChangePassFormType,
} from "../types/logTypes";
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

  const resetP = async (token: string, pass: string) => {
    try {
      const data = await userService.resetPass();
      toast.success("Password Reset successful");
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  const forgotP = async (email: string) => {
    try {
      const data = await userService.forgotP(email);
      toast.success("Email Sent");
    } catch (error) {
      toast.error("Try again");
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
  const logout = (type?: "n" | "t") => {
    userService.logout();
    setUser(null);

    type === "n"
      ? toast.success("Logout Successful", { toastId: type })
      : type === "t"
      ? toast.error("Session expired", { toastId: type })
      : null;
  };

  const updateProfile = async (user: FormDetails) => {
    try {
      const updatedUser = await userService.updateProfile(user);
      toast.success("Profile Updated");
      if (updatedUser) setUser(updatedUser);
    } catch (error) {
      error instanceof Error
        ? toast.error(error.message)
        : toast.error("An Error occurred");
    }
  };

  const changePassword = async (passwords: ChangePassFormType) => {
    await userService.changePassword(passwords);
    logout();
    toast.success("Password Changed!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        resetP,
        forgotP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
