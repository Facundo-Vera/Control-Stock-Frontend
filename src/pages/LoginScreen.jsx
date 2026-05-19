import { useState } from "react";
import { Lock, Eye, EyeOff, Mail, Droplets } from "lucide-react";
import loginImage from "../assets/stockimage.webp";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={loginImage}
            alt="Imagen de mecanico"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg mb-6">
            <Droplets className="w-8 h-8 text-white" strokeWidth={1.8} />
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">OilStore</h1>

          <p className="text-white/80 text-lg max-w-md leading-relaxed">
            Sistema de gestión de stock y ventas para lubricentros.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-[#f8fafc] flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg">
              <Droplets className="text-white" size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">OilStore</h1>

              <p className="text-sm text-gray-500">Gestión de stock</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Iniciar sesión
          </h2>

          <p className="text-gray-500 mb-10">
            Ingresa tus credenciales para acceder al panel.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>

              <div className="relative">
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className="w-full h-14 rounded-2xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none px-12 text-gray-700 transition-all"
                />

                <Mail
                  size={18}
                  className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-14 rounded-2xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none px-12 pr-12 text-gray-700 transition-all"
                />

                <Lock
                  size={18}
                  className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-2xl cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all text-white font-medium shadow-lg shadow-blue-500/20"
            >
              Ingresar al sistema
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
