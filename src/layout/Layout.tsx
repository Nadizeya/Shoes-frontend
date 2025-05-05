import { Outlet } from "react-router-dom";
import SubHeader from "@/components/SubHeader/SubHeader";
import { House, MoonStars, Sun } from "@phosphor-icons/react";
import Header, { dropDownOptions, getTime } from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // Ensure correct path for your UI components
import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/useAuth";
import { useAppSelector } from "@/store/hook";
import TinyLogo from "/assets/logo/blackwhitelogo.png";

const Layout = () => {
  const { authenticated, logout } = useAuth();
  const loginUserName = useAppSelector((state) => state.user.name);

  const StickyNav = () => {
    const navigate = useNavigate();

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-white shadow-md lg:hidden p-2 text-sm">
        <Link
          to="/"
          className="flex flex-col items-center gap-2"
          onClick={() => window.scrollTo(0, 0)} // Ensures scroll happens even if you're already on "/"
        >
          <House size={26} />
          <p>Home</p>
        </Link>

        {/* Me Section with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col items-center gap-1">
            <img
              src={TinyLogo}
              width={23}
              height={23}
              className="rounded-full"
              alt="Me Icon"
            />
            <p>Me</p>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent align="center" side="top" className="mb-3">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={TinyLogo}
                    width={30}
                    height={30}
                    alt="black and white logo"
                    className="rounded-full"
                  />{" "}
                  <div className="flex flex-col items-start">
                    <div className="flex gap-11 items-center">
                      <h6 className="font-bold">
                        {getTime() + " "}
                        {authenticated ? loginUserName : "Beautiful"}
                      </h6>
                      {getTime() === "Good Evening," ? (
                        <MoonStars size={20} weight="light" />
                      ) : (
                        <Sun size={20} weight="light" />
                      )}
                    </div>
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
                      variant="outline"
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
                <DropdownMenuItem className="flex items-start gap-4 cursor-pointer">
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
      </nav>
    );
  };

  return (
    <div className="pb-16 sm:pb-0">
      <Header />
      <SubHeader />
      <main className="min-h-screen px-4 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <StickyNav />
    </div>
  );
};

export default Layout;
