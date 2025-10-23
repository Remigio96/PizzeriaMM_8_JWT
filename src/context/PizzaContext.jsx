/* eslint react-refresh/only-export-components: ["warn", { "allowExportNames": ["usePizzas"] }] */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { pizzas as localPizzas } from "../data/pizzas";
import { FaExclamationTriangle } from "react-icons/fa";

const PizzaContext = createContext();
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(false);
  const toastShown = useRef(false);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        if (import.meta.env.DEV) await new Promise((r) => setTimeout(r, 1500));

        const res = await fetch(`${API_URL}/pizzas`);
        if (!res.ok) throw new Error("Servidor no disponible");

        const data = await res.json();
        setPizzas(data);
        setError(false);
      } catch {
        setPizzas(localPizzas);
        setError(true);

        if (!toastShown.current) {
          toast.error("No se pudo conectar con el servidor. Mostrando datos locales.");
          toastShown.current = true;
        }
      }
    };

    fetchPizzas();
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzas, error }}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzas = () => useContext(PizzaContext);
