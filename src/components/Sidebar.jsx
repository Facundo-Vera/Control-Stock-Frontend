
import { Droplet } from "lucide-react";
import { navItems } from "../data/navigation";
import NavItem from "../components/NavItem";
import UserCard from "../components/UserCard";

const Sidebar = ({ user, onLogout }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 shrink-0">

      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Droplet className="text-white" size={20} fill="currentColor" />
          </div>

          <div>
            <h1 className="font-bold text-xl">LubeStore</h1>
            <p className="text-xs text-slate-400">
              Gestión de Stock
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      <UserCard user={user} onLogout={onLogout} />
    </aside>
  );
};

export default Sidebar;