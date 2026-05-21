import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const url = import.meta.env.VITE_API_URL;

  const loadUserData = async () => {
    try {
      const response = await fetch(url + "me", {
        credentials: "include",
      });

      if (response.ok) {
        const { user } = await response.json();

        setUser({
          username: user.username,
          email: user.email,
          role: user.role,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al cargar datos de usuario:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const clearUserData = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loadUserData,
        clearUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };