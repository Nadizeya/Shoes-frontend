import { Routes } from "@/types/routes";
import { LazyOrderDetail, LazyOrderList } from "../lazy";

export const orderRoutes: Routes = [
  {
    key: "order",
    path: "/order-list",
    element: <LazyOrderList />,
  },
  {
    key: "orderDetail",
    path: `/order-list/:orderId`,
    element: <LazyOrderDetail />,
  },
];
