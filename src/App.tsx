// src/App.tsx
import { Routes, Route } from "react-router";
import SplashScreen from "./screens/splash-screen";
import HomeScreen from "./screens/home-screen";
import TutorialScreen from "./screens/tutorial-screen";
import ProgressMap from "./screens/progress-map-screen";
import QuizScreen from "./screens/quiz-screen";
import ResultsScreen from "./screens/results-screen";
import ReviewScreen from "./screens/review-screen";
import RewardsScreen from "./screens/rewards-screen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/tutorial" element={<TutorialScreen />} />
      <Route path="/progress-map" element={<ProgressMap />} />
      <Route path="/quiz" element={<QuizScreen />} />
      <Route path="/results" element={<ResultsScreen />} />
      <Route path="/review" element={<ReviewScreen />} />
      <Route path="/rewards" element={<RewardsScreen />} />
    </Routes>
  );
}

export default App;
