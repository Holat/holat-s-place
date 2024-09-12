import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  CartPage,
  ProfilePage,
  FoodDetailsPage,
  LoginPage,
  RegisterPage,
  CheckoutPage,
  OrdersPage,
  PaymentPage,
  NotFoundPage,
  AdminPage,
  ResetPass,
} from "./pages";
import { AuthRoute, ProtectedRouteAdmin } from "./components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="search/:searchTerm" element={<HomePage />} />
        <Route path="tag/:tag" element={<HomePage />} />
      </Route>
      <Route path="/food/:foodId" element={<FoodDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password/:token" element={<ResetPass />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <PaymentPage />
          </AuthRoute>
        }
      />
      {/* <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <TrackPage />
          </AuthRoute>
        }
      /> */}
      <Route
        path="/orders"
        element={
          <AuthRoute>
            <OrdersPage />
          </AuthRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRouteAdmin>
            <AdminPage />
          </ProtectedRouteAdmin>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
