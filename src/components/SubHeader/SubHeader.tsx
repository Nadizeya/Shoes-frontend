import { useState, useEffect, useRef } from "react";
import CategoriesDropDown from "./CategoriesDropDown";
import { data } from "./data";
import { useAppSelector } from "@/store/hook";

const DesktopNav = () => {
  const maincategories = useAppSelector((state) => state.home.maincategroies);
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
  // console.log(activeIndex);

  return (
    <nav className="hidden md:flex items-center justify-evenly text-white text-xs ">
      {maincategories.map((data) => (
        <div key={data.id} ref={activeIndex === data.id ? dropdownRef : null}>
          <p onClick={() => handleClick(data.id)} className="cursor-pointer">
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
  return <nav className="md:hidden absolute inset-0 bg-red-500"></nav>;
};

const SubHeader = () => {
  return (
    <header className="bg-textColor w-full px-8 py-4 border-b-2 relative">
      <MobileNav />
      <DesktopNav />
    </header>
  );
};

export default SubHeader;
