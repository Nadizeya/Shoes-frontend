import { useState, useEffect } from "react";
import CategoriesDropDown from "./CategoriesDropDown";
import { useAppSelector } from "@/store/hook";
import useResponsive from "@/utils/useResponsive";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { useAuth } from "@/utils/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { getDay } from "../header/Header";

const SubHeader = () => {
  const { authenticated, logout } = useAuth();
  const loginUserName = useAppSelector((state) => state.user.name);
  const maincategories = useAppSelector((state) => state.home.maincategroies);
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();

  const [activeIndex] = useState<number | null>(null);

  useEffect(() => {
    console.log("Active index changed:", activeIndex);
  }, [activeIndex]);

  const DesktopNav = () => {
    return (
      // <div className="">
      <nav className="flex items-center justify-evenly text-white text-xs">
        {maincategories.map((data, index) => (
          <div
            key={data.id}
            // onMouseEnter={(event) => handleMouseEnter(index, event)}
            className="relative"
          >
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <p
                  className={`cursor-pointer p-2 ${
                    activeIndex === index ? "text-blue-500" : ""
                  } hover:text-blue-400`}
                  onClick={() => {
                    if (data.name === "Brand") {
                      window.location.href = "/brands"; // Redirect to '/brands' page
                    }
                  }}
                >
                  {data.name}
                </p>
              </HoverCardTrigger>

              <HoverCardContent className="bg-white w-screen text-black shadow-lg p-4 z-40 text-sm transform translate-y-2">
                {data.categories.length > 0 ? (
                  <CategoriesDropDown
                    data={data.categories}
                    mainCategoryName={data.name}
                  />
                ) : data.brands.length > 0 ? (
                  <CategoriesDropDown
                    data={data.brands}
                    mainCategoryName={data.name}
                  />
                ) : (
                  <p className="text-gray-500">
                    No categories or brands available
                  </p>
                )}
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </nav>
    );
  };

  const MobileNav = () => {
    const navigate = useNavigate();
    return (
      <div>
        <Separator></Separator>
        {!authenticated && (
          <div className="flex justify-between px-3 py-2">
            <div className="text-sm">
              <div className="font-bold">
                <p>Sign in for free delivery.</p>
              </div>
              <p className="text-xs">
                Don't have an account?{" "}
                <Link to={"/register"}>
                  <span className="text-blue-400">Create an account</span>
                </Link>
              </p>
            </div>
            <Link to={"/login"}>
              <Button className="rounded-full py-0  px-10 text-xs">
                Sign in
              </Button>
            </Link>
          </div>
        )}
        {authenticated && (
          <p className="p-2 px-3 sm:px-7 font-bold text-sm">
            {getDay()} {loginUserName}{" "}
          </p>
        )}

        <Separator></Separator>

        <header className="flex font-bold  items-center gap-4 px-3 pt-3 overflow-x-scroll no-scrollbar text-black">
          {maincategories.map((data: any) =>
            data.name === "Brand" ? (
              <p
                key={data.id}
                className="text-xs px-3 py-4 border h-[30px] flex items-center rounded-lg whitespace-nowrap cursor-pointer hover:text-blue-400"
                onClick={() => navigate("/brands")} // Navigate programmatically
              >
                {data.name}
              </p>
            ) : (
              <a
                key={data.id}
                className="text-xs px-3 py-4 border h-[30px] flex items-center rounded-lg whitespace-nowrap"
                href={`/main-categories/${data.id}`} // Normal category links
              >
                {data.name}
              </a>
            )
          )}
        </header>
      </div>
    );
  };

  return (
    <div className="w-full">
      {desktopResponsive && (
        <header className="bg-textColor w-full px-3 py-4 border-b-2 relative">
          <DesktopNav />
        </header>
      )}
      {(mobileResponsive || tabletResponsive) && <MobileNav />}
    </div>
  );
};

export default SubHeader;
