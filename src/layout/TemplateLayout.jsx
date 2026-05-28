import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import MobileHeader from "../components/MobileHeader";

const TemplateLayout = () => {
  const { user, clearUserData } = useContext(UserContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserData();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">

      <MobileHeader
        onOpenMenu={() => setMobileMenuOpen(true)}
      />

      <Sidebar
        user={user}
        onLogout={handleLogout}
      />

      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1 min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default TemplateLayout;