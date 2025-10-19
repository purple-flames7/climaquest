import { validateGameState } from "../shcemas/game-state-schema";
import type { GameState } from "../context";

const GAME_STATE_KEY = "climaquest_game_state";
const STATE_VERSION = 1; // bump when state structure changes
const STATE_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export const loadGameState = () => {
  try {
    const raw = localStorage.getItem(GAME_STATE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const validated = validateGameState(parsed);

    if (!validated) return null;
    if (validated.version !== STATE_VERSION) return null;
    if (validated.lastUpdated && Date.now() - validated.lastUpdated > STATE_TTL)
      return null;

    return validated;
  } catch {
    return null;
  }
};

export const saveGameState = (state: GameState) => {
  const toSave = { ...state, lastUpdated: Date.now(), version: STATE_VERSION };
  localStorage.setItem(GAME_STATE_KEY, JSON.stringify(toSave));
};

export const resetGameState = (initialState: GameState): GameState => {
  const state = {
    ...initialState,
    lastUpdated: Date.now(),
    version: STATE_VERSION,
  };
  localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  return state;
};
