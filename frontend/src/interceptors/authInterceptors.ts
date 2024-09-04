import axios from "axios";
const USER = "holatPlaceUser";

axios.interceptors.request.use(
  (req) => {
    const user = localStorage.getItem(USER);
    const token = user && JSON.parse(user).token;

    if (token) {
      console.log(token);
      req.headers["authorization"] = token;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
