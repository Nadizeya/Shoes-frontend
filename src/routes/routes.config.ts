import authRoutes from "./auth/authRoutes";
import { brandRoutes } from "./brands/brandRoutes";
import { productRoutes } from "./products/productRoutes";
import { wishListRoutes } from "./wishList/wishListRoutes";
import { checkOutRoutes } from "./checkout/CheckOutRoute";
import { homeRoutes } from "./home/homeRoutes";
import { profileRoutes } from "./profile/profileRoutes";
import { loveRoutes } from "./loves/LoveRoute";

export const authenticationRoutes = [...authRoutes];

export const publicRoutes = [
  ...homeRoutes,
  ...productRoutes,
  ...brandRoutes,
  ...loveRoutes,
];

export const privateRoutes = [
  ...profileRoutes,
  ...checkOutRoutes,
  ...wishListRoutes,
];
