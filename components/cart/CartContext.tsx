"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

export type CartItem = {
  id: string;          // product id (zero-padded NNN)
  slug: string;
  name: string;        // display name e.g. "Nº 021 · Soft Red"
  image: string;
  unitPrice: number;
  qty: number;
  maxQty: number;
};

type State = { items: CartItem[]; ready: boolean };

type Action =
  | { type: "load"; items: CartItem[] }
  | { type: "add"; item: Omit<CartItem, "qty"> & { qty?: number } }
  | { type: "remove"; id: string }
  | { type: "setQty"; id: string; qty: number }
  | { type: "clear" };

const STORAGE_KEY = "gn:cart:v1";

const initial: State = { items: [], ready: false };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "load":
      return { items: action.items, ready: true };
    case "add": {
      const add = Math.max(1, action.item.qty ?? 1);
      const idx = state.items.findIndex((it) => it.id === action.item.id);
      if (idx >= 0) {
        const existing = state.items[idx]!;
        const nextQty = Math.min(existing.maxQty, existing.qty + add);
        const next = [...state.items];
        next[idx] = { ...existing, qty: nextQty };
        return { ...state, items: next };
      }
      const item: CartItem = {
        ...action.item,
        qty: Math.min(action.item.maxQty, add),
      };
      return { ...state, items: [...state.items, item] };
    }
    case "remove":
      return { ...state, items: state.items.filter((it) => it.id !== action.id) };
    case "setQty": {
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter((it) => it.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, qty: Math.min(it.maxQty, action.qty) } : it,
        ),
      };
    }
    case "clear":
      return { ...state, items: [] };
    default:
      return state;
  }
}

type Ctx = {
  items: CartItem[];
  ready: boolean;
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  /** Set/unset the slide-out drawer */
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hydrated = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.items)) {
          dispatch({ type: "load", items: parsed.items });
          return;
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    dispatch({ type: "load", items: [] });
  }, []);

  // Persist on change (after hydration only)
  useEffect(() => {
    if (!state.ready) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: state.items }),
      );
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

  const add = useCallback<Ctx["add"]>(
    (item) => dispatch({ type: "add", item }),
    [],
  );
  const remove = useCallback<Ctx["remove"]>(
    (id) => dispatch({ type: "remove", id }),
    [],
  );
  const setQty = useCallback<Ctx["setQty"]>(
    (id, qty) => dispatch({ type: "setQty", id, qty }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<Ctx>(() => {
    const count = state.items.reduce((n, it) => n + it.qty, 0);
    const subtotal = state.items.reduce((n, it) => n + it.qty * it.unitPrice, 0);
    return {
      items: state.items,
      ready: state.ready,
      count,
      subtotal,
      add,
      remove,
      setQty,
      clear,
      drawerOpen,
      openDrawer,
      closeDrawer,
    };
  }, [state, drawerOpen, add, remove, setQty, clear, openDrawer, closeDrawer]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart(): Ctx {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
