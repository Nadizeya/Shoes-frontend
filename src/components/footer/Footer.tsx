import Logo from "/assets/logo/logo.jpg";
import Facebook from "/assets/logo/facebook.jpg";
import Instagram from "/assets/logo/instagram.jpg";
import Gmail from "/assets/logo/gmail.jpg";
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
              <img src={Facebook} width={30} height={30} alt="facebook logo" />
            </a>
          </li>
          <li className="cursor-pointer">
            <a target="_blank" href="www.instagram.com">
              <img
                src={Instagram}
                width={50}
                height={50}
                alt="instagram logo"
              />
            </a>
          </li>
          <li className="cursor-pointer">
            <a target="_blank" href="www.gmail.com">
              <img src={Gmail} width={30} height={30} alt="instagram logo" />
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
    <footer className="bg-main text-white container py-16">
      {desktopResponsive && <DesktopFooter />}
      {mobile_tablet && <MobileAndTabletFooter />}
    </footer>
  );
};

export default Footer;
