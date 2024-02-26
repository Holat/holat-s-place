import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

interface DecodedToken {
  exp: number;
}
const useTokenExpiration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user && user.token) {
      const decodedToken = jwtDecode<DecodedToken>(user.token);
      if (decodedToken.exp < Date.now() / 1000) {
        logout("t");
        navigate(`/login?returnUrl=${location.pathname}`);
      }
    }
  }, [location.pathname, logout, navigate, user]);
};

export default useTokenExpiration;
