import {
  Heart,
  Basket,
  Package,
  Notepad,
  UserRectangle,
  Sun,
  MoonStars,
} from "@phosphor-icons/react";
import { useNavigate, Link } from "react-router-dom";
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
import { useAppSelector } from "@/store/hook";
import useResponsive from "@/utils/useResponsive";

type AuthenticatedT = boolean | null | string;

type dropDownOptionT = {
  id: number;
  icon: JSX.Element;
  title: string;
  desc: string;
  path: string;
};

export const dropDownOptions: dropDownOptionT[] = [
  {
    id: 1,
    icon: <Package size={23} />,
    title: "Orders",
    desc: "View and track online or pickup orders",
    path: "/order-list",
  },
  {
    id: 2,
    icon: <Heart size={23} />,
    title: "Loves",
    desc: "View saved products",
    path: "/love-list",
  },
  {
    id: 3,
    icon: <UserRectangle size={23} />,
    title: "Account Settings",
    desc: "Payment, contact info , addresses, password",
    path: "/profile",
  },
  {
    id: 4,
    icon: <Notepad size={23} />,
    title: "Nadi's Recommendations",
    desc: "Recommendations from your store visits",
    path: "/nadi-recommendation",
  },
];

export const getTime = () => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return "Good Morning,";
  } else if (hours < 18) {
    return "Good Afternoon,";
  } else {
    return "Good Evening,";
  }
};

export const getDay = (): string => {
  const day: number = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  const greetings: Record<number, string> = {
    0: "Happy Sunday,",
    1: "Happy Monday,",
    2: "Happy Tuesday,",
    3: "Happy Wednesday,",
    4: "Happy Thursday,",
    5: "Happy Friday,",
    6: "Happy Weekend,", // Change to "Happy Saturday" if preferred
  };

  return greetings[day] ?? "Happy Day"; // Ensures a string is always returned
};

const DesktopNav = ({
  authenticated,
  logout,
}: {
  authenticated: AuthenticatedT;
  logout: () => void;
}) => {
  // console.log(authenticated);
  const navigate = useNavigate();

  const loginUserName = useAppSelector((state) => state.user.name);
  const whilistCount = useAppSelector((state) => state.user.whilist_count);
  const add_to_cart = useAppSelector((state) => state.user.add_to_cart);

  return (
    <nav className="hidden md:flex items-center justify-between gap-2 ">
      <Link to={"/"}>
        <h1 className="text-2xl font-black cursor-pointer">Nadi Yoon Htike</h1>
      </Link>

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
              {!authenticated && (
                <div className="flex flex-col items-start">
                  <h6 className="font-bold">Sign In</h6>
                  <p className="text-xs">FOR FREE SHIPPING</p>
                </div>
              )}
              {authenticated && (
                <div className="flex flex-col items-start">
                  <h6 className="font-bold">Hi, {loginUserName}</h6>
                  <p className="text-xs"> {getTime()}</p>
                </div>
              )}
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
                      <div className="flex gap-11 items-center">
                        <h6 className="font-bold">
                          {getTime() + " "}
                          {authenticated ? loginUserName : "Beautiful"}
                        </h6>
                        {getTime() === "Good Evening," ? (
                          <MoonStars size={20} />
                        ) : (
                          <Sun size={20} weight="light" />
                        )}
                      </div>

                      {!authenticated && (
                        <p className="text-xs">
                          Sign in for <b className="font-bold">Free Delivery</b>{" "}
                          on all of your first orders
                        </p>
                      )}
                    </div>
                  </div>

                  {!authenticated && (
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
          <Link to="/love-list">
            <NotificationBadge
              icon={<Heart size={23} />}
              count={whilistCount}
            />
          </Link>
        </li>
        <Link to={"/checkout"}>
          <li className="flex items-center gap-4">
            <NotificationBadge
              icon={<Basket size={23} />}
              count={add_to_cart}
            />
          </li>
        </Link>
      </ul>
    </nav>
  );
};

const MobileNav = ({}: {
  authenticated: AuthenticatedT;
  logout: () => void;
}) => {
  const whilistCount = useAppSelector((state) => state.user.whilist_count);
  const add_to_cart = useAppSelector((state) => state.user.add_to_cart);

  return (
    <nav className="flex items-center justify-between">
      <Link to={"/"}>
        <h1 className="text-lg sm:text-xl md:text-2xl font-black">
          Nadi Yoon Htike
        </h1>
      </Link>

      <SearchBar />

      <ul className="flex items-center gap-4">
        <li>
          <Link to="/love-list">
            <NotificationBadge
              icon={<Heart size={23} />}
              count={whilistCount}
            />
          </Link>
        </li>
        <Link to={"/checkout"}>
          <li className="flex items-center gap-4">
            <NotificationBadge
              icon={<Basket size={23} />}
              count={add_to_cart}
            />
          </li>
        </Link>
      </ul>
    </nav>
  );
};

const Header = () => {
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();
  const { authenticated, logout } = useAuth();

  return (
    <header className="bg-white px-3 sm:px-8 py-4">
      {desktopResponsive && (
        <DesktopNav authenticated={authenticated} logout={logout} />
      )}
      {(mobileResponsive || tabletResponsive) && (
        <MobileNav authenticated={authenticated} logout={logout} />
      )}
    </header>
  );
};

export default Header;
