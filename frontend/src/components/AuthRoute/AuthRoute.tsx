import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTokenExpiration from "../../hooks/useTokenExpiration";

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  useTokenExpiration();

  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}
