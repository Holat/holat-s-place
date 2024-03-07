import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { SideBar } from "./components";
import Loading from "./components/Loading/Loading";
import useLoading from "./hooks/useLoading";
import { setLoadingInterceptor } from "./interceptors/loadingInterceptor";

function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, [hideLoading, showLoading]);

  return (
    <div className="app">
      <Loading />
      <SideBar />
      <AppRoutes />
    </div>
  );
}

export default App;
