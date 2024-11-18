import { useState, useEffect, useRef } from "react";
import CategoriesDropDown from "./CategoriesDropDown";
import { data } from "./data";
import { useAppSelector } from "@/store/hook";
import useResponsive from "@/utils/useResponsive";

const SubHeader = () => {
  const maincategories = data;
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();
  console.log(maincategories, "in subheader");

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActiveIndex(null);
    }
  };

  useEffect(() => {
    if (activeIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeIndex]);

  const DesktopNav = () => {
    return (
      <nav className="flex items-center justify-evenly text-white text-xs ">
        {maincategories.map((data: any) => (
          <div key={data.id} ref={activeIndex === data.id ? dropdownRef : null}>
            <p
              onClick={() => handleClick(data.id)}
              className={`cursor-pointer p-2 ${
                activeIndex === data.id ? "text-blue-500" : ""
              }`}
            >
              {data.name}
            </p>
            {activeIndex === data.id && (
              <div className="absolute top-full left-0 w-full">
                <CategoriesDropDown data={data.categories} />
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  };

  const MobileNav = () => {
    return (
      <header className="flex justify-center items-center gap-4 px-3 overflow-x-scroll no-scrollbar text-black">
        {maincategories.map((data: any) => (
          <div
            key={data.id}
            className="text-xs px-3 py-1 border h-[50px] flex justify-center items-center "
          >
            {data.name}
          </div>
        ))}
      </header>
    );
  };

  return (
    <div>
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
