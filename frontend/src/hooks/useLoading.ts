import { useContext } from "react";
import { LoadingContext } from "../context/LoadingProvider";

const useLoading = () => useContext(LoadingContext);
export default useLoading;
