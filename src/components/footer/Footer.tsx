import Logo from "/assets/footer/Badge.png";
import Messenger from "/assets/footer/messenger.svg";
import Instagram from "/assets/footer/instagram.svg";
import Gmail from "/assets/footer/gmail.svg";
import Telegram from "/assets/footer/telegram.svg";
import Icon from "../ui/icon";
import useResponsive from "@/utils/useResponsive";
import { FacebookLogo } from "@phosphor-icons/react";

const MobileAndTabletFooter = () => {
  // TODO : MOBILE
  return <div className="">Mobile footer</div>;
};
const DesktopFooter = () => {
  return (
    <div className="w-full h-full  text-sm">
      <div className="flex justify-between">
        <div className="flex flex-col gap-6">
          <img
            src={Logo}
            width={100}
            height={100}
            alt="nadi yoon htike's logo"
          />
          <h3 className="tracking-wider font-bold text-[16px]">
            Nadi Yoon Htike
          </h3>
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
          <h3 className="font-bold text-center tracking-widest">
            Social Media
          </h3>
          <ul className="flex items-center gap-2">
            <li className="cursor-pointer">
              <a target="_blank" href="https://www.facebook.com/nadiyoon22">
                <FacebookLogo size={25} weight="fill" />
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                target="_blank"
                href="https://www.instagram.com/nadiyoonhtike/"
              >
                <Icon width={20} height={20} src={Messenger} alt="instagram" />
              </a>
            </li>
            <li className="cursor-pointer">
              <a target="_blank" href="https://mail.google.com/mail/u/0/#inbox">
                <Icon width={20} height={20} src={Instagram} alt="gmail" />
              </a>
            </li>
            <li className="cursor-pointer">
              <a target="_blank" href="https://www.facebook.com/nadiyoon22">
                <Icon width={20} height={20} src={Telegram} alt="facebook" />
              </a>
            </li>
            <li className="cursor-pointer">
              <a target="_blank" href="https://www.facebook.com/nadiyoon22">
                <Icon width={20} height={20} src={Gmail} alt="facebook" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const { mobileResponsive, desktopResponsive, tabletResponsive } =
    useResponsive();

  const mobile_tablet = mobileResponsive || tabletResponsive;

  // console.log(mobile_tablet);
  return (
    <footer className="bg-black text-white px-10 py-16">
      {desktopResponsive && <DesktopFooter />}
      {mobile_tablet && <MobileAndTabletFooter />}
    </footer>
  );
};

export default Footer;
