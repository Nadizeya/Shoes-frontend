import type { ReactNode } from "react";

export type Route = {
  element: ReactNode;
  key: string;
  path: string;
};

export interface AuthRoute {
  key: string;
  path: string;
  element: ReactNode;
}

// Define Routes type as an array of AuthRoute
export type AuthRoutes = AuthRoute[];

export type Routes = Route[];
