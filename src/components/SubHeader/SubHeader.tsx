import { useState, useEffect, useRef } from "react";
import CategoriesDropDown from "./CategoriesDropDown";
import { useAppSelector } from "@/store/hook";
import useResponsive from "@/utils/useResponsive";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const SubHeader = () => {
  const maincategories = useAppSelector((state) => state.home.maincategroies);
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target as Node)
  //   ) {
  //     setActiveIndex(null);
  //   }
  // };

  // useEffect(() => {
  //   if (activeIndex !== null) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [activeIndex]);

  const DesktopNav = () => {
    return (
      <nav className="flex items-center justify-evenly text-white text-xs ">
        {maincategories.map((data: any, index: number) => (
          <div
            key={data.id}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="relative group"
          >
            <p
              className={`cursor-pointer p-2 ${
                activeIndex === data.id ? "text-blue-500" : ""
              }hover:text-blue-400`}
            >
              {data.name}
            </p>
            {activeIndex === index && (
              <div className="absolute top-full left-0 w-full">
                <CategoriesDropDown
                  data={data.categories}
                  mouseLeave={handleMouseLeave}
                />
              </div>
            )}
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
