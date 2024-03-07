import { createContext, useState } from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const defaultLoadingContext: LoadingContextType = {
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
};

export const LoadingContext = createContext<LoadingContextType>(
  defaultLoadingContext
);

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
