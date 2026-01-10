import { useEffect } from "react";
import { AppRoutes } from "./routes";
import { useGameStore } from "./stores/game-store";
import { levels } from "./data/levels";

/**
 * Root application component.
 *
 * Performs one time initialization of global game data
 * Renders the application's route tree
 */
function App() {
  const { levels: storeLevels, setLevels } = useGameStore();

  /**
   * Initialize game levels in the store on first app load.
   * Prevents re-seedint the store on re-renders or hot reloads.
   */
  useEffect(() => {
    if (!storeLevels.length) {
      setLevels(levels);
    }
  }, [storeLevels.length, setLevels]);

  return <AppRoutes />;
}

export default App;
