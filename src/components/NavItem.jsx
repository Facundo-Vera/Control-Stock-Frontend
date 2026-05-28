import { NavLink } from "react-router-dom";

const NavItem = ({ item, onClick }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
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
};

export default NavItem;