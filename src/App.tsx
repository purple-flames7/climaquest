// src/App.tsx
import { Routes, Route } from "react-router"; //
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import TutorialScreen from "./screens/TutorialScreen";
import ProgressMap from "./screens/ProgressMap";
import QuizScreen from "./screens/QuizScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/tutorial" element={<TutorialScreen />} />
      <Route path="/progress-map" element={<ProgressMap />} />
      <Route path="/quiz" element={<QuizScreen />} />
    </Routes>
  );
}

export default App;
