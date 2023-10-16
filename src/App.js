import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import UserState from "./context/UserState";
import ChartPage from "./components/ChartPage";
import Unauthorized from "./components/Error/Unauthorized";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <div>
      <UserState>
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chart/:id" element={<ChartPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </AnimatePresence>
      </UserState>
    </div>
  );
}

export default App;
