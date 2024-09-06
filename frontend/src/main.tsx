import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./context/CartProvider.tsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./interceptors/authInterceptors.ts";
import LoadingProvider from "./context/LoadingProvider.tsx";
import FoodProvider from "./context/FoodProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <FoodProvider>
          <AuthProvider>
            <CartProvider>
              <App />
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                progressStyle={{
                  backgroundColor: "#fa6400",
                }}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </CartProvider>
          </AuthProvider>
        </FoodProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
