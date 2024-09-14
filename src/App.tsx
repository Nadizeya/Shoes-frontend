import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Layout from "./layout";
import {
  publicRoutes,
  privateRoutes,
  authenticationRoutes,
} from "@/routes/routes.config";
import NotFound from "@/pages/notFound";
import MainLoading from "./components/shared/MainLoading";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Authentication routes (show first if user has not visited) */}
          {authenticationRoutes.map((route) => (
            <Route
              index={route.key === "welcome"} // Set welcome as index if user hasn't visited
              key={route.key}
              path={route.path}
              element={
                <Suspense fallback={<MainLoading />}>{route.element}</Suspense>
              }
            />
          ))}

          {/* Main Layout with public and private routes */}

          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            {publicRoutes.map((route) => (
              <Route
                index={route.key === "home"} // Set home as index if user has visited
                path={route.path}
                key={route.key}
                element={
                  <Suspense fallback={<MainLoading />}>
                    {route.element}
                  </Suspense>
                }
              />
            ))}

            {/* Private routes with protected wrapper */}
            {privateRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.key}
                element={<ProtectedRoutes />}
              >
                <Route
                  key={route.key}
                  path={route.path}
                  element={
                    <Suspense fallback={<p>Loading...</p>}>
                      {route.element}
                    </Suspense>
                  }
                />
              </Route>
            ))}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
