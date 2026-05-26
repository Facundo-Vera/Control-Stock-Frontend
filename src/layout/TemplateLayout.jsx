import React, { useState, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  Droplet, 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Boxes, 
  LogOut, 
  Menu, 
  X,
  User
} from "lucide-react";
import { UserContext } from "../context/UserContext";

const TemplateLayout = () => {
  const { user, clearUserData } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserData();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Productos",
      path: "/products",
      icon: Package,
    },
    {
      name: "Nueva Venta",
      path: "/new-sale",
      icon: ShoppingCart,
    },
    {
      name: "Control Stock",
      path: "/stock",
      icon: Boxes,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/25">
            <Droplet className="text-white" size={20} fill="currentColor" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">LubeStore</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Droplet className="text-white" size={20} fill="currentColor" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-900 tracking-tight">LubeStore</h1>
              <p className="text-xs text-slate-400 font-medium">Gestión de Stock</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={20} strokeWidth={2} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout Button */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
              {user?.username ? user.username.charAt(0).toUpperCase() : <User size={18} />}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-sm text-slate-800 truncate">
                {user?.username || "Usuario"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email || "correo@ejemplo.com"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl font-semibold text-sm transition-all duration-150"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Navigation (Slide-over Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <aside className="relative flex flex-col w-72 max-w-xs bg-white h-full shadow-2xl z-10 transition-transform duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Droplet className="text-white" size={20} fill="currentColor" />
                </div>
                <div>
                  <h1 className="font-bold text-xl text-slate-900 tracking-tight">LubeStore</h1>
                  <p className="text-xs text-slate-400 font-medium">Gestión de Stock</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-600 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    <Icon size={20} strokeWidth={2} />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* User Card & Logout */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                  {user?.username ? user.username.charAt(0).toUpperCase() : <User size={18} />}
                </div>
                <div className="overflow-hidden">
                  <p className="font-semibold text-sm text-slate-800 truncate">
                    {user?.username || "Usuario"}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.email || "correo@ejemplo.com"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl font-semibold text-sm transition-all duration-150"
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default TemplateLayout;
