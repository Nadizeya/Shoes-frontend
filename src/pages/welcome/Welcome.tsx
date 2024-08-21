import { ButtonAlign } from "./components/ButtonAlign";
import { WelcomeText } from "./components/WelcomeText";
import { CardShared } from "@/components/shared/CardShared";
import useResponsive from "@/utils/useResponsive";
import { WelcomeCard } from "./components/WelcomeCard";
import Warejeans from "/assets/warjeans.jpg";

const MobileWelcome = () => {
  return (
    <div className="h-screen grid place-content-center">
      <div className="grid gap-y-5 px-5">
        <div className="mx-auto">
          <img src={Warejeans} alt="" width={300} height={300} />
        </div>
        <WelcomeText />
        <ButtonAlign />
      </div>
    </div>
  );
};
const DesktopWelcome = () => {
  return (
    <div className="h-screen grid place-items-center">
      <CardShared
        logo={
          <div className="flex items-center justify-center ml-10">
            <img src={Warejeans} alt="" width={300} height={300} />
          </div>
        }
        cardContent={<WelcomeCard />}
      />
    </div>
  );
};

const TabletWelcome = () => {
  return <h1>Tablet</h1>;
};
const Welcome = () => {
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();

  return (
    <>
      {desktopResponsive && <DesktopWelcome />}
      {tabletResponsive && <TabletWelcome />}
      {mobileResponsive && <MobileWelcome />}
    </>
  );
};

export default Welcome;
