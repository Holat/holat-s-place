import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

interface DecodedToken {
  exp: number;
}

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.token) {
      const decodedToken = jwtDecode<DecodedToken>(user.token);
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem("holatPlaceUser");
      }
    }
  }, [user]);

  if (!user || !user.token) {
    return <Navigate to={`/login?returnUrl=${location.pathname}`} replace />;
  }

  return <>{children}</>;
}
