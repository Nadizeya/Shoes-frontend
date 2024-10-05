// import Logo from "/assets/logo/logo.jpg";
// import Facebook from "/assets/logo/facebook.jpg";
// import Instagram from "/assets/logo/instagram.jpg";
// import Gmail from "/assets/logo/gmail.jpg";
import useResponsive from "@/utils/useResponsive";

// const MobileAndTabletFooter = () => {
//   // TODO : MOBILE
//   return <div className="">Mobile footer</div>;
// };
// const DesktopFooter = () => {
//   return (
//     <div className="w-full h-full flex justify-between">
//       <div className="flex flex-col gap-6">
//         <h3 className="font-bold">Contact Us</h3>
//         <p>nadiyoonhtike@gmail.com</p>
//         <img src={Logo} width={100} height={100} alt="nadi yoon htike's logo" />
//       </div>
//       <div className="flex flex-col gap-6">
//         <h3 className="font-bold">About Us</h3>
//         <ul className="flex flex-col gap-3">
//           <li>About Us</li>
//           <li>Product Catalog</li>
//           <li>Wholesale Inquiry</li>
//         </ul>
//       </div>
//       <div className="flex flex-col gap-6">
//         <h3 className="font-bold">Customer Service</h3>
//         <ul className="flex flex-col gap-3">
//           <li>Privacy Policy</li>
//           <li>Return / Refund</li>
//           <li>Terms Of Service</li>
//           <li>Delivery Information</li>
//         </ul>
//       </div>
//       <div className="flex flex-col gap-6">
//         <h3 className="font-bold">Customer Service</h3>

//         <ul className="flex items-center gap-4">
//           <li className="cursor-pointer">
//             <a target="_blank" href="www.facebook.com">
//               <img src={Facebook} width={30} height={30} alt="facebook logo" />
//             </a>
//           </li>
//           <li className="cursor-pointer">
//             <a target="_blank" href="www.instagram.com">
//               <img
//                 src={Instagram}
//                 width={50}
//                 height={50}
//                 alt="instagram logo"
//               />
//             </a>
//           </li>
//           <li className="cursor-pointer">
//             <a target="_blank" href="www.gmail.com">
//               <img src={Gmail} width={30} height={30} alt="instagram logo" />
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// const Footer = () => {
//   const { mobileResponsive, desktopResponsive, tabletResponsive } =
//     useResponsive();

//   const mobile_tablet = mobileResponsive || tabletResponsive;

//   console.log(mobile_tablet);
//   return (
//     <footer className="bg-main text-white container py-16">
//       {desktopResponsive && <DesktopFooter />}
//       {mobile_tablet && <MobileAndTabletFooter />}
//     </footer>
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
