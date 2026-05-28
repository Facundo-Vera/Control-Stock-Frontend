// components/layout/UserCard.jsx

import { User, LogOut } from "lucide-react";

const UserCard = ({ user, onLogout }) => {
  return (
    <div className="p-4 border-t border-slate-100 bg-slate-50/50">
      <div className="flex items-center gap-3 mb-4 px-2">
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
          {user?.username
            ? user.username.charAt(0).toUpperCase()
            : <User size={18} />}
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
        onClick={onLogout}
        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl font-semibold text-sm transition-all duration-150"
      >
        <LogOut size={18} />
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserCard;