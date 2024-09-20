import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/utils/useAuth";
import { Button } from "@/components/ui/button";
import Logo from "/assets/logo/headerlogo.jpg";
import Store from "/assets/logo/Vector.svg";
import Community from "/assets/logo/community.svg";
import Profile from "/assets/logo/Group.svg";
import Heart from "/assets/logo/heart.svg";
import Wishlist from "/assets/logo/wishlist.svg";
import SearchBar from "../shared/Search";
import Icon from "../ui/icon";
import { Separator } from "@/components/ui/separator";

type AuthenticatedT = boolean | null | string;

const navLinks: Record<"path" | "link_name", string>[] = [
  {
    path: "/",
    link_name: "Home",
  },
  {
    path: "brands",
    link_name: "Brands",
  },
  {
    path: "products",
    link_name: "Products",
  },
];

const renderLogo = () => {
  return <h1 className="font-bold text-2xl">Nadi Yoon Htike</h1>;
};

const renderNavLinks = () => {
  return (
    <div className="flex gap-7">
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <Icon src={Community} alt="Store Icon" />

          <span className="text-sm font-semibold">Community</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-2">
          <div>
            <Icon src={Profile} alt="Logo Profile" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Sign In</span>
            <small className="text-xs">For FREE Shipping</small>
          </div>
        </div>
      </div>

      <div className="flex gap-7">
        <Icon src={Heart} alt="Heart Icon" />
        <Icon src={Wishlist} alt="Wishlist Icon" />
      </div>
    </div>
  );
};

const DesktopNav = ({ authenticated }: { authenticated: AuthenticatedT }) => {
  console.log(authenticated);

  return (
    <nav className="hidden md:flex items-center justify-evenly gap-2 ">
      <div>{renderLogo()}</div>
      <SearchBar />

      {renderNavLinks()}
      {/* {renderAuthBtn(authenticated)} */}
    </nav>
  );
};
// const renderAuthBtn = (authenticated: AuthenticatedT) => {
//   if (authenticated) {
//     return <li>Avatar</li>;
//   }
//   return (
//     <>
//       <li>
//         <NavLink to={`/login`}>
//           <Button>Login</Button>
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to={`/register`}>
//           <Button variant="secondary" size="sm">
//             Create Account
//           </Button>
//         </NavLink>
//       </li>
//     </>
//   );
// };

const MobileNav = ({ authenticated }: { authenticated: AuthenticatedT }) => {
  console.log(authenticated);
  return (
    <nav className="md:hidden absolute inset-0 bg-red-500">
      <div>{renderLogo()}</div>

      <ul className="flex flex-col items-end bg-green-500 h-full">
        {renderNavLinks()}
        {/* {renderAuthBtn(authenticated)} */}
      </ul>
    </nav>
  );
};

const Header = () => {
  const { authenticated } = useAuth();

  return (
    <header className="w-full px-8 py-4 border-b-2">
      <MobileNav authenticated={authenticated} />
      <DesktopNav authenticated={authenticated} />
    </header>
  );
};

export default Header;
