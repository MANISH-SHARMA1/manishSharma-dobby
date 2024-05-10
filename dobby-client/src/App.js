import { Routes, Route } from "react-router-dom";
import RequireUser from "./components/RequireUser";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* User get access to home page if he/she is logged in */}
        <Route element={<RequireUser />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
