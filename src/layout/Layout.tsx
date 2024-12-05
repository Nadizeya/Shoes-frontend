import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";
import SubHeader from "@/components/SubHeader/SubHeader";
import { Toaster } from "@/components/ui/toaster";
import { House, UsersThree } from "@phosphor-icons/react";
import Icon from "@/components/ui/icon";
import Logo from "/assets/logo/logo.jpg";

const Layout = () => {
  const StickyNav = () => {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-white shadow-md sm:hidden p-4">
        <div className="flex flex-col items-center gap-2">
          <House size={32} />
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Icon src={Logo} width={27} height={32} />
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <UsersThree size={32} />
          <p>Community</p>
        </div>
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
