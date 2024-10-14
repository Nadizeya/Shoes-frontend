import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";
import SubHeader from "@/components/SubHeader/SubHeader";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  return (
    <div>
      <Header />
      {/* <SubHeader /> */}
      <main className="min-h-screen px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
