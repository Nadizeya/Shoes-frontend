import authRoutes from "./auth/authRoutes";
import { categoryRoutes } from "./categories/categoryRoutes";
import { productRoutes } from "./products/productRoutes";
import { checkOutRoutes } from "./checkout/CheckOutRoute";
import { homeRoutes } from "./home/homeRoutes";
import { profileRoutes } from "./profile/profileRoutes";
import { loveRoutes } from "./loves/LoveRoute";
import { orderRoutes } from "./order/OrderRoute";

export const authenticationRoutes = [...authRoutes];

export const publicRoutes = [
  ...homeRoutes,
  ...productRoutes,
  ...categoryRoutes,
];

export const privateRoutes = [
  ...profileRoutes,
  ...checkOutRoutes,
  ...loveRoutes,
  ...orderRoutes,
];
