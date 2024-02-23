import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const useTokenExpiration = () => {
  useEffect(() => {
    const checkExp = () => {
      const userString = localStorage.getItem("holatPlaceUser");
      if (userString) {
        try {
          const { token } = JSON.parse(userString);
          if (token) {
            const decodedToken = jwtDecode<DecodedToken>("token");
            if (decodedToken.exp < Date.now() / 1000) {
              localStorage.removeItem("holatPlaceUser");
            }
          }
        } catch (error) {
          console.log("user not available");
        }
      }
    };

    checkExp();
  }, []);
};

export default useTokenExpiration;
