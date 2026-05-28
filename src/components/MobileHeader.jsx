import { Droplet, Menu } from "lucide-react";

const MobileHeader = ({ onOpenMenu }) => {
  return (
    <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/25">
          <Droplet className="text-white" size={20} fill="currentColor" />
        </div>

        <span className="font-bold text-xl text-slate-900 tracking-tight">
          LubeStore
        </span>
      </div>

      <button
        onClick={onOpenMenu}
        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
      >
        <Menu size={24} />
      </button>
    </header>
  );
};

export default MobileHeader;

