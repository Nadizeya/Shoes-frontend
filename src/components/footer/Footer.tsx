import Logo from "/assets/footer/Badge.png";
import Messenger from "/assets/footer/messenger.svg";
import Instagram from "/assets/footer/instagram.svg";
import Gmail from "/assets/footer/gmail.svg";
import Telegram from "/assets/footer/telegram.svg";
import Icon from "../ui/icon";
import useResponsive from "@/utils/useResponsive";
import { FacebookLogo } from "@phosphor-icons/react";
import { Separator } from "../ui/separator";

const MobileAndTabletFooter = () => {
  return (
    <div className="w-full bg-black text-white  py-16 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4">
        <img src={Logo} width={80} height={80} alt="nadi yoon htike's logo" />
        <h3 className="tracking-wider font-bold text-lg">Nadi Yoon Htike</h3>
      </div>

      {/* Mapped Footer Sections */}
      {/* <div className="flex flex-col gap-6">
        {footerSections.map((section, index) => (
          <div key={index} className="text-center">
            <h3 className="font-bold text-md mb-2">{section.title}</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {section.items.map((item, idx) => (
                <li key={idx} className="cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}

      {/* Social Media Section */}
      <div className="flex flex-col items-center gap-4">
        <ul className="flex gap-5">
          {socialLinks.map((link, index) => (
            <li key={index} className="cursor-pointer">
              <a target="_blank" rel="noopener noreferrer" href={link.href}>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Separator className="w-full bg-[#bbbbbb]" />
      <div className="flex flex-col">
        <small className="text-center">
          ©2025, Nadi Yoon Htike, All right reserved.
        </small>{" "}
        <small className="text-center">1-347-242-8322</small>
      </div>
    </div>
  );
};
// const footerSections = [
//   {
//     title: "About Us",
//     items: ["About Us", "Product Catalog", "Wholesale Inquiry"],
//   },
//   {
//     title: "Customer Service",
//     items: [
//       "Privacy Policy",
//       "Return / Refund",
//       "Terms Of Service",
//       "Delivery Information",
//     ],
//   },
// ];

const socialLinks = [
  {
    href: "https://www.facebook.com/nadiyoon22",
    icon: <FacebookLogo size={25} weight="fill" />,
    alt: "facebook",
  },
  {
    href: "https://www.facebook.com/messages/t/100011958466272",
    icon: <Icon width={20} height={20} src={Messenger} alt="messenger" />,
  },
  {
    href: "https://www.instagram.com/nadiyoonhtike/",
    icon: <Icon width={20} height={20} src={Instagram} alt="instagram" />,
  },
  {
    href: "https://www.instagram.com/nadiyoonhtike/",
    icon: <Icon width={20} height={20} src={Telegram} alt="telegram" />,
  },
  {
    href: "https://mail.google.com/mail/u/0/#inbox",
    icon: <Icon width={20} height={20} src={Gmail} alt="gmail" />,
  },
];

const DesktopFooter = () => {
  return (
    <div className="w-full h-full text-sm ">
      <div className="flex justify-between items-center px-16 py-10">
        {/* Logo Section */}
        <div className="flex flex-col gap-4">
          <img
            src={Logo}
            width={100}
            height={100}
            alt="nadi yoon htike's logo"
          />
          <h3 className="tracking-wider font-bold text-[14px]">
            Nadi Yoon Htike
          </h3>
        </div>

        {/* Mapped Footer Sections */}
        {/* {footerSections.map((section, index) => (
          <div key={index} className="flex flex-col gap-6">
            <h3 className="font-bold">{section.title}</h3>
            <ul className="flex flex-col gap-3">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))} */}

        {/* Social Media Section */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-center tracking-widest">
            Social Media
          </h3>
          <ul className="flex items-center gap-2">
            {socialLinks.map((link, index) => (
              <li key={index} className="cursor-pointer">
                <a target="_blank" rel="noopener noreferrer" href={link.href}>
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Separator className="w-full bg-[#bbbbbb]" />
      <div className="flex flex-col py-5">
        <small className="text-center">
          ©2025, Nadi Yoon Htike, All right reserved.
        </small>{" "}
        <small className="text-center">1-347-242-8322</small>
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
    <footer className="bg-black text-white ">
      {desktopResponsive && <DesktopFooter />}
      {mobile_tablet && <MobileAndTabletFooter />}
    </footer>
  );
};

export default Footer;
