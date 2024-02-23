import AppRoutes from "./AppRoutes";
import { SideBar } from "./components";

function App() {
  return (
    <div className="app">
      <SideBar />
      <AppRoutes />
    </div>
  );
}

export default App;
