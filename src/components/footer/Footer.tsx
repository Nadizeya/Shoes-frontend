import Logo from "/assets/footer/Badge.png";
import Facebook from "/assets/footer/facebook.svg";
import Instagram from "/assets/footer/instagram.svg";
import Gmail from "/assets/footer/gmail.svg";
import Icon from "../ui/icon";
import useResponsive from "@/utils/useResponsive";

const MobileAndTabletFooter = () => {
  // TODO : MOBILE
  return <div className="">Mobile footer</div>;
};
const DesktopFooter = () => {
  return (
    <div className="w-full h-full flex justify-between">
      <div className="flex flex-col gap-6">
        <h3 className="font-bold">Contact Us</h3>
        <p>nadiyoonhtike@gmail.com</p>
        <img src={Logo} width={100} height={100} alt="nadi yoon htike's logo" />
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="font-bold">About Us</h3>
        <ul className="flex flex-col gap-3">
          <li>About Us</li>
          <li>Product Catalog</li>
          <li>Wholesale Inquiry</li>
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="font-bold">Customer Service</h3>
        <ul className="flex flex-col gap-3">
          <li>Privacy Policy</li>
          <li>Return / Refund</li>
          <li>Terms Of Service</li>
          <li>Delivery Information</li>
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="font-bold">Customer Service</h3>

        <ul className="flex items-center gap-4">
          <li className="cursor-pointer">
            <a target="_blank" href="www.facebook.com">
              <Icon width={30} height={30} src={Facebook} alt="facebook" />
            </a>
          </li>
          <li className="cursor-pointer">
            <a target="_blank" href="www.instagram.com">
              <Icon width={30} height={30} src={Instagram} alt="instagram" />
            </a>
          </li>
          <li className="cursor-pointer">
            <a target="_blank" href="www.gmail.com">
              <Icon width={30} height={30} src={Gmail} alt="gmail" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Footer = () => {
  const { mobileResponsive, desktopResponsive, tabletResponsive } =
    useResponsive();

  const mobile_tablet = mobileResponsive || tabletResponsive;

  console.log(mobile_tablet);
  return (
    <footer className="bg-main text-white px-10 py-16">
      {desktopResponsive && <DesktopFooter />}
      {mobile_tablet && <MobileAndTabletFooter />}
    </footer>
  );
};

export default Footer;
