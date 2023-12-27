import { useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import { OrderBar, SideBar } from "./components";
import { useLocation } from "react-router-dom";

function App() {
  const [orderBarIsOpen, setOrderBarIsOpen] = useState(true);

  const location = useLocation();

  useEffect(() => {
    location.pathname === "/profile" ||
    location.pathname === "/cart" ||
    location.pathname === "/login" ||
    location.pathname === "/logout"
      ? setOrderBarIsOpen(false)
      : setOrderBarIsOpen(true);
  }, [location]);

  return (
    <div className="app">
      <SideBar />
      <OrderBar isOpen={orderBarIsOpen} />
      <AppRoutes />
    </div>
  );
}

export default App;
