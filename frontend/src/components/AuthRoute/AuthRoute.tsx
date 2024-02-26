import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return user && user.token ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}
