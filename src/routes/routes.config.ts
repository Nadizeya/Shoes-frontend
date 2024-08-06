import authRoutes from "./auth/authRoutes";
import { brandRoutes } from "./brands/brandRoutes";
import { productRoutes } from "./products/productRoutes";
import { wishListRoutes } from "./wishList/wishListRoutes";
import { checkOutRoutes } from "./checkout/CheckOutRoute";
import { homeRoutes } from "./home/homeRoutes";
import { profileRoutes } from "./profile/profileRoutes";
import { addToCartRoutes } from "./addtocart/addToCartRoutes";

export const authenticationRoutes = [...authRoutes];

export const publicRoutes = [...homeRoutes, ...productRoutes, ...brandRoutes];

export const privateRoutes = [
  ...profileRoutes,
  ...checkOutRoutes,
  ...wishListRoutes,
  ...addToCartRoutes,
];
