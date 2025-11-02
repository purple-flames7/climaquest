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
  persist<UIStore>(
    (set): UIStore => ({
      isMenuOpen: false,
      toast: null,
      theme: "system",

      setMenuOpen(v: boolean): void {
        set({ isMenuOpen: v });
      },

      setToast(t: { id: string | number; message: string } | null): void {
        set({ toast: t });
      },

      setTheme(theme: UIStore["theme"]): void {
        set({ theme });
      },
    }),
    {
      name: "climaquest-ui",
      version: 2,
      migrate: (persistedState: any, _version: number): UIStore => ({
        ...persistedState,
        theme: persistedState.theme ?? "system",
      }),
    }
  )
);
