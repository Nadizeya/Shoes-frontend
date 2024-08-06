import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/utils/useAuth";
import { Button } from "@/components/ui/button";

type AuthenticatedT = boolean | null | string;

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
      <h1>LOGO</h1>

      <ul className="flex flex-col items-end bg-green-500 h-full">
        {renderNavLinks()}
        {renderAuthBtn(authenticated)}
      </ul>
    </nav>
  );
};

const DesktopNav = ({ authenticated }: { authenticated: AuthenticatedT }) => {
  console.log(authenticated);

  return (
    <nav className="hidden md:flex items-center justify-between gap-2 ">
      <h1>LOGO</h1>

      <ul className="flex items-center gap-2">
        {renderNavLinks()}
        {renderAuthBtn(authenticated)}
      </ul>
    </nav>
  );
};

const Header = () => {
  const { authenticated } = useAuth();

  return (
    <header className="bg-orange-400 w-full px-8 py-4 ">
      <MobileNav authenticated={authenticated} />
      <DesktopNav authenticated={authenticated} />
    </header>
  );
};

export default Header;
