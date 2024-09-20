const navLinks: Record<"name", string>[] = [
  {
    name: "New",
  },
  {
    name: "Brand",
  },
  {
    name: "Makeup",
  },
  {
    name: "Skin Care",
  },
  {
    name: "Hair",
  },
  {
    name: "Fagrance",
  },
  {
    name: "Tools and Brushes",
  },
  {
    name: "Bath and Body ",
  },
  {
    name: "Mini Size",
  },
  {
    name: "Beauty Under 10000",
  },
  {
    name: "Sale Offers",
  },
];

const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center justify-evenly  text-white text-xs">
      {navLinks.map((link, index) => (
        <p key={index}>{link.name}</p>
      ))}
    </nav>
  );
};

const MobileNav = () => {
  return <nav className="md:hidden absolute inset-0 bg-red-500"></nav>;
};

const SubHeader = () => {
  return (
    <header className="bg-textColor w-full px-8 py-4 border-b-2">
      <MobileNav />
      <DesktopNav />
    </header>
  );
};

export default SubHeader;
