import React from "react";
import {
  Heart,
  Basket,
  ClockClockwise,
  Package,
  Notepad,
  UserRectangle,
} from "@phosphor-icons/react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NotificationBadge from "@/components/ui/notification-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import TinyLogo from "/assets/logo/blackwhitelogo.jpg";
import { useAuth } from "@/utils/useAuth";
import SearchBar from "./components/Search";
import SecondHeader from "./SecondHeader";
import { useAppSelector } from "@/store/hook";

type AuthenticatedT = boolean | null | string;

type dropDownOptionT = {
  id: number;
  icon: JSX.Element;
  title: string;
  desc: string;
  path: string;
};

const dropDownOptions: dropDownOptionT[] = [
  {
    id: 1,
    icon: <ClockClockwise size={23} />,
    title: "Buy It Again",
    desc: "Reorder from in-store and online purchases",
    path: "/login",
  },
  {
    id: 2,
    icon: <Package size={23} />,
    title: "Orders",
    desc: "View and track online or pickup orders",
    path: "/login",
  },
  {
    id: 3,
    icon: <Heart size={23} />,
    title: "Loves",
    desc: "View saved products",
    path: "/login",
  },
  {
    id: 4,
    icon: <UserRectangle size={23} />,
    title: "Account Settings",
    desc: "Payment, contact info , addresses, password",
    path: "/login",
  },
  {
    id: 5,
    icon: <Notepad size={23} />,
    title: "Nadi's Recommendations",
    desc: "Recommendations from your store visits",
    path: "/login",
  },
];

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

const renderNavLinks = () => {
  return (
    <>
      {navLinks.map((navlink, index: number) => (
        <React.Fragment key={navlink.path + index}>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : ""
            }
            to={navlink.path}
          >
            {navlink.link_name}
          </NavLink>
        </React.Fragment>
      ))}
    </>
  );
};

const renderAuthBtn = (authenticated: AuthenticatedT) => {
  if (authenticated) {
    return <li>Avatar</li>;
  }
  return (
    <>
      <li>
        <NavLink to={`/login`}>
          <Button>Login</Button>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/register`}>
          <Button variant="secondary" size="sm">
            Create Account
          </Button>
        </NavLink>
      </li>
    </>
  );
};

const MobileNav = ({ authenticated }: { authenticated: AuthenticatedT }) => {
  console.log(authenticated);
  return (
    <nav className="md:hidden absolute inset-0 bg-red-500">
      <h1>Nadi Yoon Htike</h1>

      <ul className="flex flex-col items-end bg-green-500 h-full">
        {renderNavLinks()}
        {renderAuthBtn(authenticated)}
      </ul>
    </nav>
  );
};

const DesktopNav = ({
  authenticated,
  logout,
}: {
  authenticated: AuthenticatedT;
  logout: () => void;
}) => {
  console.log(authenticated);
  const navigate = useNavigate();

  const loginUserName = useAppSelector((state) => state.user.username);

  return (
    <nav className="hidden md:flex items-center justify-between gap-2 ">
      <h1 className="text-2xl font-black">Nadi Yoon Htike</h1>

      <SearchBar />

      <ul className="flex items-center gap-8">
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 border-none">
              <img
                src={TinyLogo}
                width={35}
                height={35}
                alt="black and white logo"
              />
              <div className="flex flex-col items-start">
                <h6 className="font-bold">Sign In</h6>
                <p className="text-xs">FOR FREE SHIPPING</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={TinyLogo}
                      width={35}
                      height={35}
                      alt="black and white logo"
                    />
                    <div className="flex flex-col items-start">
                      <h6 className="font-bold">
                        Happy weekend,{" "}
                        {!authenticated ? loginUserName : "Beautiful"}
                      </h6>
                      {authenticated && (
                        <p className="text-xs">
                          Sign in for <b className="font-bold">Free Delivery</b>{" "}
                          on all of your first orders
                        </p>
                      )}
                    </div>
                  </div>

                  {authenticated && (
                    <div className="grid grid-cols-2 items-center gap-2">
                      <Button
                        className="rounded-full h-9"
                        onClick={() => navigate("/login")}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="rounded-full h-9 border border-slate-400"
                        variant={"outline"}
                        onClick={() => navigate("/register")}
                      >
                        Create Account
                      </Button>
                    </div>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {dropDownOptions.map((option) => (
                <Link key={option.id} to={option.path}>
                  <DropdownMenuItem className="flex items-start gap-4 cursor-pointer ">
                    {option.icon}
                    <div className="flex flex-col gap-1">
                      <h6 className="font-semibold">{option.title}</h6>
                      <p className="text-xs">{option.desc}</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </Link>
              ))}
              <DropdownMenuItem
                className="hover:text-white cursor-pointer"
                onClick={() => logout()}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <NotificationBadge icon={<Heart size={23} />} count={10} />
        </li>
        <li className="flex items-center gap-4">
          <NotificationBadge icon={<Basket size={23} />} count={5} />
        </li>
      </ul>
    </nav>
  );
};

const Header = () => {
  const { authenticated, logout } = useAuth();

  return (
    <div className="">
      <header className="bg-white container py-6">
        <MobileNav authenticated={authenticated} />
        <DesktopNav authenticated={authenticated} logout={logout} />
      </header>
      <SecondHeader />
    </div>
  );
};

export default Header;
