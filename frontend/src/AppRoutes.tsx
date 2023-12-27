import { Routes, Route } from "react-router-dom";
import { HomePage, CartPage, ProfilePage, FoodDetailsPage } from "./pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="search/:searchTerm" element={<HomePage />} />
        <Route path="tag/:tag" element={<HomePage />} />
      </Route>
      <Route path="/food/:foodId" element={<FoodDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
