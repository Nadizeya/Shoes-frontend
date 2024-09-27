import { useAuth } from "@/utils/useAuth";
import Community from "/assets/header/community.svg";
import Profile from "/assets/header/profile.svg";
import Heart from "/assets/header/heart.svg";
import Wishlist from "/assets/header/wishlist.svg";
import SearchBar from "../shared/Search";
import Icon from "../ui/icon";
import { Separator } from "@/components/ui/separator";
import ProfileDropDown from "./ProfileDropDown";
import { useState } from "react";
import { DropdownMenuTrigger, DropdownMenu } from "../ui/dropdown-menu";

type AuthenticatedT = boolean | null | string;

const renderLogo = () => {
  return <h1 className="font-bold text-2xl">Nadi Yoon Htike</h1>;
};

const renderNavLinks = () => {
  const [showDropDown, setShowDropDown] = useState<boolean | null>(false);
  const handleClick = () => {
    setShowDropDown(true);
  };

  return (
    <div className="flex gap-7">
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <Icon src={Community} alt="Store Icon" />

          <span className="text-sm font-semibold">Community</span>
        </div>
        <Separator orientation="vertical" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleClick}
            >
              <div>
                <Icon src={Profile} alt="Logo Profile" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Sign In</span>
                <small className="text-xs">For FREE Shipping</small>
              </div>
              {showDropDown && <ProfileDropDown />}
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>

      <div className="flex gap-7">
        <Icon src={Heart} alt="Heart Icon" />
        <Icon src={Wishlist} alt="Wishlist Icon" />
      </div>
    </div>
  );
};

const DesktopNav = ({ authenticated }: { authenticated: AuthenticatedT }) => {
  // console.log(authenticated);

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
  // console.log(authenticated) ;
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
