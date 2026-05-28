import { Droplet, X } from "lucide-react";
import { navItems } from "../data/navigation";
import NavItem from "./NavItem";
import UserCard from "./UserCard";



const MobileSidebar = ({ open, onClose, user, onLogout }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="relative flex flex-col w-72 max-w-xs bg-white h-full shadow-2xl z-10">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Droplet className="text-white" size={20} fill="currentColor" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-900 tracking-tight">
                LubeStore
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Gestión de Stock
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} onClick={onClose} />
          ))}
        </nav>

        <UserCard
          user={user}
          onLogout={() => {
            onClose();
            onLogout();
          }}
        />
      </aside>
    </div>
  );
};
export default MobileSidebar;
