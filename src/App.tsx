import { useEffect } from "react";
import { AppRoutes } from "./routes";
import { useGameStore } from "./stores/game-store";
import { levels } from "./data/levels";

function App() {
  const { levels: storeLevels, setLevels } = useGameStore();

  useEffect(() => {
    if (!storeLevels.length) {
      setLevels(levels);
    }
  }, [storeLevels.length, setLevels]);

  return <AppRoutes />;
}

export default App;
