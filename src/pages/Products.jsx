import React from "react";
import { Package, Plus, Search } from "lucide-react";

const Products = () => {
  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-500 mt-1">Administra los productos de tu lubricentro.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all duration-200 w-fit">
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 max-w-md mb-6">
          <Search className="text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar productos por nombre, código..." 
            className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
            <Package size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No hay productos registrados</h3>
          <p className="text-gray-500 max-w-sm">Aquí verás la lista de aceites, filtros y repuestos. Comienza creando uno nuevo.</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
