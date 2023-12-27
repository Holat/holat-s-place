import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { AuthContextType } from "../types/userTypes";

export default function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}
