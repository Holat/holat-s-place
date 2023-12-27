import { createContext, useState } from "react";
import * as userService from "../services/userService";
import { AuthContextType, UserType } from "../types/userTypes";
import { toast } from "react-toastify";
import { RegisterValues } from "../types/logTypes";

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
      if (user) {
        setUser(user);
        toast.success("Login Successful");
      } else {
        toast.error("Error logging In");
      }
    } catch (error) {
      toast.error("Error logging In");
    }
  };

  const register = async (data: RegisterValues) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success("Registered");
    } catch (error) {
      toast.error("Unsuccessful");
    }
  };

  const logout = () => {
    console.log(user);
    userService.logout();
    setUser(null);
    toast.success("Logout Successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
