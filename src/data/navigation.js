

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Boxes,
} from "lucide-react";

export const navItems = [
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