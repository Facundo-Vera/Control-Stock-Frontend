import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import Prueba from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
         <Route path="/" element={<Prueba/>} />
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  );
};

export default App;
