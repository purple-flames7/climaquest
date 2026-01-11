import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * UIStore
 * ----------
 * Centralized store for ephemeral UI state that is NOT part of game logic.
 *
 * This store is intentionally kept separate from game/progress/user state to:
 * - Avoid UI concerns leaking into business logic
 * - Allow easy resets without affecting gameplay
 * - Keep persistence lightweight and safe
 *
 * Persisted because UI preferences (theme) should survive reloads.
 */
interface UIStore {
  /**
   * Whether the main navigation / overlay menu is open
   */
  isMenuOpen: boolean;

  /**
   * Currently active toast notification (if any).
   * Null indicates no toast should be rendered.
   */
  toast: { id: string | number; message: string } | null;

  /**
   * UI theme preference.
   * - "system" defers to OS-level theme
   */
  theme: "light" | "dark" | "system";

  /** UI actions */
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

      /**
       * Open or close the global menu.
       * Kept as a simple boolean instead of toggle to allow explicit control
       * from multiple UI entry points.
       */
      setMenuOpen(v: boolean): void {
        set({ isMenuOpen: v });
      },

      /**
       * Set or clear the active toast notification.
       * The `id` allows UI layers to key animations safely.
       */
      setToast(t: { id: string | number; message: string } | null): void {
        set({ toast: t });
      },

      /**
       * Update the UI theme preference.
       * Actual theme application (e.g. CSS variables) should live outside the store.
       */
      setTheme(theme: UIStore["theme"]): void {
        set({ theme });
      },
    }),
    {
      name: "climaquest-ui",
      version: 2,

      /**
       * Migration guard to ensure older persisted UI state
       * always has a valid theme value.
       */
      migrate: (persistedState: any): UIStore => ({
        ...persistedState,
        theme: persistedState.theme ?? "system",
      }),
    }
  )
);
