import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import UserState from "./context/UserState";
import ChartPage from "./components/ChartPage";

function App() {
  return (
    <div>
      <UserState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chart/:id" element={<ChartPage />} />
        </Routes>
      </UserState>
    </div>
  );
}

export default App;
