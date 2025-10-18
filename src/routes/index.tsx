import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { RoutePaths } from "./route-path";
import { Loadable, PageWrapper, PageLoader } from "../components";

const SplashScreen = lazy(() => import("../screens/splash-screen"));
const HomeScreen = lazy(() => import("../screens/home-screen"));
const TutorialScreen = lazy(() => import("../screens/tutorial-screen"));
const ProgressMap = lazy(() => import("../screens/progress-map-screen"));
const QuizScreen = lazy(() => import("../screens/quiz-screen"));
const ResultsScreen = lazy(() => import("../screens/results-screen"));
const ReviewScreen = lazy(() => import("../screens/review-screen"));
const RewardsScreen = lazy(() => import("../screens/rewards-screen"));

export const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {[
        { path: RoutePaths.SPLASH, Component: SplashScreen },
        { path: RoutePaths.HOME, Component: HomeScreen },
        { path: RoutePaths.TUTORIAL, Component: TutorialScreen },
        { path: RoutePaths.PROGRESS_MAP, Component: ProgressMap },
        { path: RoutePaths.QUIZ, Component: QuizScreen },
        { path: RoutePaths.RESULTS, Component: ResultsScreen },
        { path: RoutePaths.REVIEW, Component: ReviewScreen },
        { path: RoutePaths.REWARDS, Component: RewardsScreen },
      ].map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Loadable>
              <PageWrapper>
                <Component />
              </PageWrapper>
            </Loadable>
          }
        />
      ))}
    </Routes>
  </Suspense>
);
