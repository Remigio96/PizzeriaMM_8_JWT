/* eslint react-refresh/only-export-components: ["warn", { "allowExportNames": ["useCart"] }] */

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const p = action.payload;
      const exist = state.find(i => i.id === p.id);
      if (exist) return state.map(i => i.id === p.id ? { ...i, count: i.count + 1 } : i);
      return [...state, { id: p.id, name: p.name, price: p.price, img: p.img, count: 1 }];
    }
    case "INC": return state.map(i => i.id === action.id ? { ...i, count: i.count + 1 } : i);
    case "DEC": return state.flatMap(i => i.id === action.id ? (i.count - 1 <= 0 ? [] : [{ ...i, count: i.count - 1 }]) : [i]);
    case "REMOVE": return state.filter(i => i.id !== action.id);
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, [], (init) => {
    try { return JSON.parse(localStorage.getItem("cart")) || init; } catch { return init; }
  });

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.count, 0), [cart]);

  const value = {
    cart,
    total,
    add: (p) => dispatch({ type: "ADD", payload: p }),
    inc: (id) => dispatch({ type: "INC", id }),
    dec: (id) => dispatch({ type: "DEC", id }),
    remove: (id) => dispatch({ type: "REMOVE", id }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
