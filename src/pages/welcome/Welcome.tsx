import { ButtonAlign } from "./components/ButtonAlign";
import { WelcomeText } from "./components/WelcomeText";
import { CardShared } from "@/components/shared/CardShared";
import useResponsive from "@/utils/useResponsive";
import { WelcomeCard } from "./components/WelcomeCard";
import { AuthBg } from "@/components/shared/AuthBg";
import { AuthLogo } from "@/components/shared/AuthLogo";
import Logo from "/assets/logo/logo.jpg";

const MobileWelcome = () => {
  return (
    <div className="h-screen grid place-content-center">
      <div className="grid gap-y-5 px-5">
        <div className="mx-auto">
          <img src={Logo} alt="" width={200} height={200} />
        </div>
        <WelcomeText />
        <ButtonAlign />
      </div>
    </div>
  );
};

const DesktopWelcome = () => {
  return (
    <AuthBg>
      <CardShared logo={<AuthLogo />} cardContent={<WelcomeCard />} />
    </AuthBg>
  );
};

const Welcome = () => {
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();

  return (
    <>
      {desktopResponsive && <DesktopWelcome />}
      {(tabletResponsive || mobileResponsive) && <MobileWelcome />}
    </>
  );
};

export default Welcome;
