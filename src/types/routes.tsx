import type { ReactNode } from "react";

export type Route = {
  element: ReactNode;
  key: string;
  path: string;
};

export type Routes = Route[];
