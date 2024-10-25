import { Outlet } from "react-router-dom";
import "./App.css";
import MainNavBar from "./components/MainNavBar";

function App() {
  return (
    <div className="app">
      <MainNavBar />
      <Outlet />
    </div>
  );
}

export default App;
