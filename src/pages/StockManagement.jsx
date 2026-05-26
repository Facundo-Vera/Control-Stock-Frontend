import React from "react";
import { Boxes, ArrowUpDown, AlertCircle } from "lucide-react";

const StockManagement = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Control de Stock</h1>
        <p className="text-gray-500 mt-1">Gestión de entradas, salidas y alertas de inventario mínimo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <ArrowUpDown size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Últimos Movimientos</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Stock Mínimo</p>
            <p className="text-2xl font-bold text-gray-900">0 productos</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <Boxes size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Categorías</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Movimientos de Inventario</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-gray-500">No se registran movimientos recientes de stock.</p>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;
