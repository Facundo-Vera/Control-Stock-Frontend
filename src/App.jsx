import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import NewSale from "./pages/NewSale";
import StockManagement from "./pages/StockManagement";
import TemplateLayout from "./layout/TemplateLayout";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <TemplateLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="new-sale" element={<NewSale />} />
        <Route path="stock" element={<StockManagement />} />
      </Route>
    </Routes>
  );
};

export default App;
