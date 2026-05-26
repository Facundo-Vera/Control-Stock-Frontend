import { useState, useContext } from "react";
import { Lock, Eye, EyeOff, Mail, Droplets } from "lucide-react";
import loginImage from "../assets/stockimage.webp";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { logIn } from "../helpers/auth";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { loadUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const [response, setResponse] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await logIn(data.email, data.password);

    setResponse(response);

    if (response.ok) {
      await loadUserData();

      navigate("/");
    }
  };

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

          <div className="mb-10 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />

            <p className="text-sm text-blue-800 font-medium">
              Ingresa tus credenciales para acceder al panel.
            </p>
          </div>

          {response && !response.ok && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-700">
                {response.message || "Credenciales incorrectas"}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>

              <div className="relative">
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className={`w-full h-14 rounded-2xl bg-white border outline-none px-12 text-gray-700 transition-all
                  ${
                    errors.email
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                  {...register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Correo inválido",
                    },
                  })}
                />

                <Mail
                  size={18}
                  className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full h-14 rounded-2xl bg-white border outline-none px-12 pr-12 text-gray-700 transition-all
                  ${
                    errors.password
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                   
                  })}
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

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all text-white font-medium shadow-lg shadow-blue-500/20 disabled:opacity-70"
            >
              {isSubmitting ? "Ingresando..." : "Ingresar al sistema"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;