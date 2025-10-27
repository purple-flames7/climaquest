import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  isMenuOpen: boolean;
  toast: { id: string | number; message: string } | null;
  theme: "light" | "dark" | "system";
  setMenuOpen: (v: boolean) => void;
  setToast: (t: { id: string | number; message: string } | null) => void;
  setTheme: (t: UIStore["theme"]) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      toast: null,
      theme: "system",

      setMenuOpen(v) {
        set({ isMenuOpen: v });
      },

      setToast(t) {
        set({ toast: t });
      },

      setTheme(theme) {
        set({ theme });
      },
    }),
    {
      name: "climaquest-ui",
      version: 2,
      migrate: (persistedState: any, version: number) => ({
        ...persistedState,
        theme: persistedState.theme ?? "system",
      }),
    }
  )
);
