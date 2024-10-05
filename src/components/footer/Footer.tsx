import Icon from "../ui/icon";
import Warejeans from "/assets/footer/Badge.png";
import Facebook from "/assets/footer/facebook.svg";
import Instagram from "/assets/footer/instagram.svg";
import Gmail from "/assets/footer/gmail.svg";
import { Separator } from "@radix-ui/react-separator";

const Footer = () => {
  return (
    <div className="p-10 bg-textColor text-[#F1F4FF]">
      <div className="space-y-5">
        <div className="flex justify-between">
          <div className="space-y-5 basis-2/5 pl-12">
            <div className="space-y-5">
              <h1>Contact Us</h1>
              <p>nadiyoonhtike@gmail.com</p>
            </div>
            <div className="flex ">
              <img src={Warejeans} width={120} height={159} alt="" />
            </div>
          </div>
          <div className="basis-1/5 space-y-5">
            <h1>About us</h1>
            <div className="space-y-1">
              <p>About us</p>
              <p>Product Catalog</p>
              <p>Wholesale inquiry</p>
            </div>
          </div>
          <div className="basis-1/5 space-y-5">
            <h1>Customer Service</h1>
            <div className="space-y-1">
              <p>Privacy Policy</p>
              <p>Return / Refund</p>
              <p>Terms of Service</p>
              <p>Delivery Information</p>
            </div>
          </div>
          <div className="basis-1/5 space-y-5">
            <h1>Social Media</h1>
            <div className="flex gap-5">
              <Icon src={Facebook} alt="facebook" />
              <Icon src={Instagram} alt="instagram" />
              <Icon src={Gmail} alt="instagram" />
            </div>
          </div>
        </div>
      </div>

      <Separator orientation="horizontal" className="my-6" />
    </div>
  );
};

export default Footer;
