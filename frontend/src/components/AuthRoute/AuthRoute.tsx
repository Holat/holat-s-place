import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();
  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}
