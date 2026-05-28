import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
