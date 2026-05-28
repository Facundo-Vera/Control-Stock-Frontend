import React from "react";
import { ShoppingCart, User, Plus } from "lucide-react";

const NewSale = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nueva Venta</h1>
        <p className="text-gray-500 mt-1">Registra una nueva venta de lubricantes o servicios.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Productos</h2>
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-100 rounded-xl">
              <ShoppingCart className="text-gray-300 mb-3" size={36} />
              <p className="text-gray-500 text-sm">El carrito está vacío. Agrega productos de la lista.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen de Venta</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Descuento</span>
                <span>$0.00</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>$0.00</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 mt-4">
                Confirmar Venta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSale;
