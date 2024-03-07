import axios from "axios";

export const setLoadingInterceptor = ({
  showLoading,
  hideLoading,
}: {
  showLoading: () => void;
  hideLoading: () => void;
}) => {
  axios.interceptors.request.use(
    (req) => {
      showLoading();
      return req;
    },
    (error) => {
      hideLoading();
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      hideLoading();
      return res;
    },
    (error) => {
      hideLoading();
      return Promise.reject(error);
    }
  );
};
