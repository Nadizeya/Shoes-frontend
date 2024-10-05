import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";
import SubHeader from "@/components/SubHeader/SubHeader";

const Layout = () => {
  return (
    <>
      <Header />
      {/* <SubHeader /> */}
      <main className="min-h-screen px-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
