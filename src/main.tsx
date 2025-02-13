import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store, persistor } from "@/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { AuthProvider } from "./hooks/useAuthGuard.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            {/* ✅ Wrap AuthProvider around App */}
            <App />
          </AuthProvider>
        </PersistGate>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
