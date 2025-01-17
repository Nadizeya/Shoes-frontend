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

const SubHeader = () => {
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
                >
                  {data.name}
                </p>
              </HoverCardTrigger>

              <HoverCardContent className="bg-white w-screen text-black shadow-lg  p-4 z-40 text-sm transform translate-y-2">
                <CategoriesDropDown data={data.categories} />
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </nav>
    );
  };

  const MobileNav = () => {
    return (
      <div>
        <Separator></Separator>

        <div className="flex justify-between px-3 py-2">
          <div className="text-sm">
            <div className="font-bold">
              <p>Sign in for free delivery.</p>
            </div>
            <p className="text-xs">
              Don't have an acoount?{" "}
              <span className="text-blue-400">Create an account</span>
            </p>
          </div>
          <Button className="rounded-full py-0  px-10 text-xs">Sign in</Button>
        </div>
        <Separator></Separator>

        <header className="flex font-bold  items-center gap-4 px-3 pt-3 overflow-x-scroll no-scrollbar text-black">
          {maincategories.map((data: any) => (
            <div
              key={data.id}
              className="text-xs px-3 py-4 border h-[30px] flex items-center rounded-lg whitespace-nowrap "
            >
              {data.name}
            </div>
          ))}
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
