import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Package,
  Plus,
  Search,
  ArrowLeft,
  Edit,
  Trash2,
  RefreshCw,
  AlertTriangle,
  Droplet,
  Filter,
  CheckCircle,
  XCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ChevronDown
} from "lucide-react";
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct
} from "../helpers/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterVehicle, setFilterVehicle] = useState("");
  const [filterActive, setFilterActive] = useState("active");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const productsRes = await fetchProducts(1000, 0, "true");
      const categoriesRes = await fetchCategories();
      if (productsRes.ok) {
        setProducts(productsRes.products || []);
      }
      if (categoriesRes.ok) {
        setCategories(categoriesRes.data || []);
      }
    } catch (error) {
      showToast("Error al conectar con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, filterVehicle, filterActive]);

  const handleNewProductClick = () => {
    setEditingProduct(null);
    reset({
      name: "",
      brand: "",
      typeVehicle: "Auto",
      category: "",
      price: "",
      stock: "",
      stockMin: ""
    });
    setViewMode("form");
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    reset({
      name: product.name || "",
      brand: product.brand || "",
      typeVehicle: product.typeVehicle || "Auto",
      category: product.category?._id || "",
      price: product.price || "",
      stock: product.stock || "",
      stockMin: product.stockMin || ""
    });
    setViewMode("form");
  };

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      brand: data.brand || undefined,
      typeVehicle: data.typeVehicle,
      category: data.category || undefined,
      price: Number(data.price),
      stock: Number(data.stock),
      stockMin: data.stockMin ? Number(data.stockMin) : undefined
    };

    try {
      let res;
      if (editingProduct) {
        res = await updateProduct(editingProduct._id, payload);
      } else {
        res = await createProduct(payload);
      }

      if (res.ok) {
        showToast(res.message || "Operación completada con éxito", "success");
        setViewMode("list");
        loadData();
      } else {
        showToast(res.message || "Ocurrió un error al guardar", "error");
      }
    } catch (error) {
      showToast("Error de conexión", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.ok) {
        showToast("Producto desactivado correctamente", "success");
        loadData();
      } else {
        showToast(res.message || "Error al desactivar el producto", "error");
      }
    } catch (error) {
      showToast("Error de conexión", "error");
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await restoreProduct(id);
      if (res.ok) {
        showToast("Producto restaurado correctamente", "success");
        loadData();
      } else {
        showToast(res.message || "Error al restaurar el producto", "error");
      }
    } catch (error) {
      showToast("Error de conexión", "error");
    }
  };

  const getProductIcon = (product) => {
    const catName = product.category?.name?.toLowerCase() || "";
    const prodName = product.name?.toLowerCase() || "";
    if (catName.includes("aceite") || catName.includes("oil") || prodName.includes("aceite") || prodName.includes("oil") || prodName.includes("motul") || prodName.includes("elaion") || prodName.includes("castrol")) {
      return (
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
          <Droplet size={18} />
        </div>
      );
    }
    if (catName.includes("filtro") || catName.includes("filter") || prodName.includes("filtro") || prodName.includes("filter") || prodName.includes("bosch") || prodName.includes("k&n")) {
      return (
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
          <Filter size={18} />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center">
        <Package size={18} />
      </div>
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !filterCategory || product.category?._id === filterCategory;

    const matchesVehicle =
      !filterVehicle || product.typeVehicle === filterVehicle;

    const matchesActive =
      filterActive === "all" ||
      (filterActive === "active" && product.active !== false) ||
      (filterActive === "inactive" && product.active === false);

    return matchesSearch && matchesCategory && matchesVehicle && matchesActive;
  });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startItemIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItemIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen relative">
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border animate-in slide-in-from-top-4 duration-300 bg-white">
          {toast.type === "success" ? (
            <CheckCircle className="text-emerald-500" size={24} />
          ) : (
            <XCircle className="text-red-500" size={24} />
          )}
          <span className="text-sm font-semibold text-gray-800">{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
      )}

      {viewMode === "list" ? (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
              <p className="text-gray-500 mt-1">Administra los productos de tu lubricentro.</p>
            </div>
            <button
              onClick={handleNewProductClick}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/10 transition-all duration-200 cursor-pointer w-full sm:w-fit"
            >
              <Plus size={20} />
              Nuevo Producto
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 md:col-span-1">
                <Search className="text-gray-400 shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por nombre, marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-sm"
                />
              </div>

              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-600 appearance-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              <div className="relative">
                <select
                  value={filterVehicle}
                  onChange={(e) => setFilterVehicle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-600 appearance-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="">Todos los vehículos</option>
                  <option value="Auto">Auto</option>
                  <option value="Moto">Moto</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              <div className="relative">
                <select
                  value={filterActive}
                  onChange={(e) => setFilterActive(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-600 appearance-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="active">Activos</option>
                  <option value="inactive">Inactivos</option>
                  <option value="all">Todos</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="text-blue-500 animate-spin" size={36} />
                <p className="text-gray-400 text-sm font-medium">Cargando productos...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
                  <Package size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-1">No se encontraron productos</h3>
                <p className="text-gray-500 max-w-sm text-sm">
                  Prueba cambiando los términos de búsqueda o filtros, o registra un producto nuevo.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Marca</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Vehículo</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedProducts.map((product) => {
                      const isLowStock = product.stock <= (product.stockMin || 5);
                      return (
                        <tr key={product._id} className="hover:bg-gray-50/40 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {getProductIcon(product)}
                              <div>
                                <span className={`font-semibold text-sm block ${product.active === false ? "text-gray-400 line-through" : "text-gray-900"}`}>
                                  {product.name}
                                </span>
                                {isLowStock && product.active !== false && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-500 mt-0.5">
                                    <AlertTriangle size={10} />
                                    Stock bajo
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 font-medium">{product.brand || "—"}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 border border-gray-100 text-gray-600">
                              {product.category?.name || "Repuesto"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                            {product.typeVehicle === "Moto" ? "Motocicleta" : "Automóvil"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                            ${product.price ? product.price.toLocaleString("es-AR", { minimumFractionDigits: 2 }) : "0,00"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                product.active === false
                                  ? "bg-gray-100 text-gray-400"
                                  : isLowStock
                                    ? "bg-red-50 text-red-600"
                                    : "bg-emerald-50 text-emerald-600"
                              }`}
                            >
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {product.active !== false ? (
                                <>
                                  <button
                                    onClick={() => handleEditClick(product)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                                    title="Editar"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(product._id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                                    title="Desactivar"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleRestore(product._id)}
                                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 border border-emerald-100 rounded-xl transition-all cursor-pointer"
                                  title="Restaurar"
                                >
                                  <RefreshCw size={12} className="animate-spin-hover" />
                                  Restaurar
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && filteredProducts.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-400">
                  Mostrando {startItemIndex}-{endItemIndex} de {totalItems} productos
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="p-2 rounded-xl border border-gray-100 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm font-bold text-gray-700 px-2">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="p-2 rounded-xl border border-gray-100 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode("list")}
              className="p-3 bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 rounded-2xl shadow-sm transition-all cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">Volver a la lista</span>
              <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 space-y-8">
            <div className="space-y-6">
              <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-50">Información Básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Motul 5100 10W40"
                    className={`w-full bg-gray-50 border rounded-2xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:bg-white transition-all ${
                      errors.name ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-100 focus:border-blue-500"
                    }`}
                    {...register("name", {
                      required: "El nombre es obligatorio",
                      minLength: { value: 3, message: "Mínimo 3 caracteres" },
                      maxLength: { value: 50, message: "Máximo 50 caracteres" }
                    })}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Marca</label>
                  <input
                    type="text"
                    placeholder="Ej. Motul"
                    className={`w-full bg-gray-50 border rounded-2xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:bg-white transition-all ${
                      errors.brand ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-100 focus:border-blue-500"
                    }`}
                    {...register("brand", {
                      maxLength: { value: 50, message: "Máximo 50 caracteres" }
                    })}
                  />
                  {errors.brand && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.brand.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    SKU / Código (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresa código o escanea barra"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:bg-white focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Stock Mínimo Alerta
                  </label>
                  <input
                    type="number"
                    placeholder="Por defecto: 5"
                    className={`w-full bg-gray-50 border rounded-2xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:bg-white transition-all ${
                      errors.stockMin ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-100 focus:border-blue-500"
                    }`}
                    {...register("stockMin", {
                      min: { value: 0, message: "El valor debe ser positivo" }
                    })}
                  />
                  {errors.stockMin && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.stockMin.message}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-50">Clasificación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Categoría</label>
                  <select
                    className={`w-full bg-gray-50 border rounded-2xl px-4 py-3.5 text-sm text-gray-600 appearance-none outline-none focus:bg-white transition-all cursor-pointer ${
                      errors.category ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-100 focus:border-blue-500"
                    }`}
                    {...register("category", { required: "Debes seleccionar una categoría" })}
                  >
                    <option value="">Selecciona categoría...</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-[42px] text-gray-400 pointer-events-none" size={16} />
                  {errors.category && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.category.message}</p>}
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Tipo de Vehículo
                  </label>
                  <select
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-600 appearance-none outline-none focus:bg-white focus:border-blue-500 transition-all cursor-pointer"
                    {...register("typeVehicle")}
                  >
                    <option value="Auto">Auto</option>
                    <option value="Moto">Moto</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-[42px] text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-50 font-sans">
                Precios e Inventario
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Precio de Venta
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className={`w-full bg-gray-50 border rounded-2xl pl-8 pr-4 py-3.5 text-sm text-gray-800 outline-none focus:bg-white transition-all ${
                        errors.price ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-100 focus:border-blue-500"
                      }`}
                      {...register("price", {
                        required: "El precio de venta es requerido",
                        min: { value: 0.01, message: "El precio debe ser mayor a 0" }
                      })}
                    />
                  </div>
                  {errors.price && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.price.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Precio de Costo (Opcional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-8 pr-4 py-3.5 text-sm text-gray-800 outline-none focus:bg-white focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Stock</label>
                  <input
                    type="number"
                    placeholder="0"
                    className={`w-full bg-gray-50 border rounded-2xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:bg-white transition-all ${
                      errors.stock ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-100 focus:border-blue-500"
                    }`}
                    {...register("stock", {
                      required: "El stock es requerido",
                      min: { value: 0, message: "El stock no puede ser negativo" }
                    })}
                  />
                  {errors.stock && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.stock.message}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-50">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="px-6 py-3.5 rounded-2xl border border-gray-100 hover:bg-gray-50 font-bold text-gray-600 text-sm transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
              >
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
