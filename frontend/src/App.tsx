import AppRoutes from "./AppRoutes";
import { SideBar } from "./components";
import useTokenExpiration from "./hooks/useTokenExpiration";

function App() {
  useTokenExpiration();

  return (
    <div className="app">
      <SideBar />
      <AppRoutes />
    </div>
  );
}

export default App;
