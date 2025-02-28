import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import {
  publicRoutes,
  privateRoutes,
  authenticationRoutes,
} from "@/routes/routes.config";
import NotFound from "@/pages/notFound";
import MainLoading from "./components/shared/MainLoading";
import Layout from "./layout/Layout";
import AuthRoutes from "./routes/AuthRoutes";
import ScrollToTop from "./components/ui/ScrollToTop";

// Helper function to safely retrieve route elements
const getRouteElement = (key: string) => {
  const route = [
    ...authenticationRoutes,
    ...publicRoutes,
    ...privateRoutes,
  ].find((r) => r.key === key);
  if (!route) {
    throw new Error(`Route with key "${key}" not found`);
  }
  return route.element;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop /> {/* Add this inside Router */}
      <Suspense fallback={<MainLoading />}>
        <Routes>
          <Route element={<AuthRoutes />}>
            {authenticationRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={getRouteElement(route.key)}
              />
            ))}
          </Route>

          {/* Main Layout: Public + Private Routes */}
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            {publicRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={getRouteElement(route.key)}
              />
            ))}

            {/* Private Routes wrapped in a single ProtectedRoutes component */}
            <Route element={<ProtectedRoutes />}>
              {privateRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={getRouteElement(route.key)}
                />
              ))}
            </Route>
          </Route>

          {/* Catch-all Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
