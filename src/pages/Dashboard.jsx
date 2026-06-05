import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { fetchProducts, fetchSales } from "../helpers/api";
import {
  DollarSign,
  Package,
  AlertTriangle,
  Droplet,
  Filter,
  Layers,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartTab, setChartTab] = useState("This Week");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const productsRes = await fetchProducts();
        const salesRes = await fetchSales();

        if (productsRes.ok) {
          setProducts(productsRes.products || []);
        }
        if (salesRes.ok) {
          setSales(salesRes.sales || []);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const totalProducts = products.length > 0 ? products.length : 482;

  const lowStockProducts = products.filter(
    (p) => p.stock <= (p.stockMin || 5) && p.active !== false,
  );

  const lowStockCount = products.length > 0 ? lowStockProducts.length : 12;

  const getTodaySalesSum = () => {
    if (sales.length === 0) return 1245.0;

    const today = new Date().toDateString();
    const todaySales = sales.filter((s) => {
      const saleDate = new Date(s.date || s.createdAt);
      return saleDate.toDateString() === today;
    });

    if (todaySales.length === 0) return 0.0;
    return todaySales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
  };

  const todaySalesSum = getTodaySalesSum();

  const getAlertsList = () => {
    if (products.length === 0 || lowStockProducts.length === 0) {
      return [
        {
          _id: "mock-1",
          name: "Motul 5100 10W40",
          categoryName: "Moto",
          stock: 2,
          type: "oil",
        },
        {
          _id: "mock-2",
          name: "Bosch Oil Filter",
          categoryName: "Auto",
          stock: 5,
          type: "filter",
        },
        {
          _id: "mock-3",
          name: "YPF Elaion 5W30",
          categoryName: "Auto",
          stock: 4,
          type: "oil",
        },
      ];
    }

    return lowStockProducts.slice(0, 3).map((p) => {
      const nameLower = p.name.toLowerCase();
      let type = "generic";
      if (
        nameLower.includes("aceite") ||
        nameLower.includes("oil") ||
        nameLower.includes("motul") ||
        nameLower.includes("elaion")
      ) {
        type = "oil";
      } else if (
        nameLower.includes("filtro") ||
        nameLower.includes("filter") ||
        nameLower.includes("bosch")
      ) {
        type = "filter";
      }

      return {
        _id: p._id,
        name: p.name,
        categoryName: p.category?.name || "Repuesto",
        stock: p.stock,
        type: type,
      };
    });
  };

  const alerts = getAlertsList();

  const chartData = {
    "This Week": [
      { day: "Mon", amount: 150 },
      { day: "Tue", amount: 320 },
      { day: "Wed", amount: 180 },
      { day: "Thu", amount: 490 },
      { day: "Fri", amount: 280 },
      { day: "Sat", amount: 590 },
      { day: "Sun", amount: 420 },
    ],
    "Last Week": [
      { day: "Mon", amount: 280 },
      { day: "Tue", amount: 190 },
      { day: "Wed", amount: 410 },
      { day: "Thu", amount: 320 },
      { day: "Fri", amount: 510 },
      { day: "Sat", amount: 390 },
      { day: "Sun", amount: 220 },
    ],
  };

  const activePoints = chartData[chartTab];

  const getSvgCoordinates = () => {
    return activePoints.map((pt, index) => {
      const x = 40 + index * 90;

      const y = 170 - (pt.amount / 700) * 145;
      return { x, y, pt };
    });
  };

  const coords = getSvgCoordinates();

  const getCurvePath = () => {
    let path = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cpX1 = curr.x + 45;
      const cpY1 = curr.y;
      const cpX2 = next.x - 45;
      const cpY2 = next.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }
    return path;
  };

  const getAreaPath = () => {
    const curve = getCurvePath();
    return `${curve} L ${coords[coords.length - 1].x} 170 L ${coords[0].x} 170 Z`;
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Bienvenido de nuevo, {user?.username || "Usuario"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <DollarSign size={24} />
                </div>
                <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} />
                  +12%
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-400">
        Ventas totales hoy
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  $
                  {todaySalesSum.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Package size={24} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-400">
                  Productos Totales
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {totalProducts}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <AlertTriangle size={24} />
                </div>
                <span className="bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                  ! Se requiere acción
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-400">
                  Items con Bajo Stock
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {lowStockCount}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                 Resumen de ventas
                </h3>
                <div className="flex bg-gray-50 border border-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setChartTab("This Week")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      chartTab === "This Week"
                        ? "bg-[#e8f2ff] text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                   Esta semana
                  </button>
                  <button
                    onClick={() => setChartTab("Last Week")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      chartTab === "Last Week"
                        ? "bg-[#e8f2ff] text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                   La semana pasada
                  </button>
                </div>
              </div>

              <div className="relative w-full h-[220px] flex items-end">
                <svg
                  viewBox="0 0 620 190"
                  className="w-full h-[195px] overflow-visible"
                >
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#3b82f6"
                        stopOpacity="0.25"
                      />
                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>

                  <line
                    x1="20"
                    y1="25"
                    x2="600"
                    y2="25"
                    stroke="#f1f5f9"
                    strokeDasharray="4"
                  />
                  <line
                    x1="20"
                    y1="73"
                    x2="600"
                    y2="73"
                    stroke="#f1f5f9"
                    strokeDasharray="4"
                  />
                  <line
                    x1="20"
                    y1="121"
                    x2="600"
                    y2="121"
                    stroke="#f1f5f9"
                    strokeDasharray="4"
                  />
                  <line
                    x1="20"
                    y1="170"
                    x2="600"
                    y2="170"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                  />

                  <path d={getAreaPath()} fill="url(#chartGrad)" />

                  <path
                    d={getCurvePath()}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {coords.map((c, i) => (
                    <g key={i} className="group cursor-pointer">
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="5"
                        fill="#ffffff"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        className="transition-all duration-150 hover:r-7"
                      />

                      <line
                        x1={c.x}
                        y1={c.y + 5}
                        x2={c.x}
                        y2="170"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        strokeDasharray="2"
                        className="opacity-0 group-hover:opacity-30 transition-opacity duration-150"
                      />

                      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                        <rect
                          x={c.x - 30}
                          y={c.y - 35}
                          width="60"
                          height="24"
                          rx="6"
                          fill="#1e293b"
                        />
                        <text
                          x={c.x}
                          y={c.y - 19}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          ${c.pt.amount}
                        </text>
                      </g>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="flex justify-between px-6 pt-3 border-t border-gray-50 mt-1">
                {activePoints.map((pt, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-gray-400 w-12 text-center"
                  >
                    {pt.day}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100/80 shadow-sm flex flex-col justify-between min-h-[360px]">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                 Alertas de bajo stock
                </h3>

                <div className="space-y-5">
                  {alerts.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                            item.type === "oil"
                              ? "bg-amber-50 text-amber-500"
                              : item.type === "filter"
                                ? "bg-blue-50 text-blue-500"
                                : "bg-slate-50 text-slate-400"
                          }`}
                        >
                          {item.type === "oil" ? (
                            <Droplet size={20} />
                          ) : item.type === "filter" ? (
                            <Filter size={20} />
                          ) : (
                            <Layers size={20} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.categoryName}
                          </p>
                        </div>
                      </div>
                      <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        {item.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex justify-center">
                <Link
                  to="/stock"
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5"
                >
                  Ver todas las alertas
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
