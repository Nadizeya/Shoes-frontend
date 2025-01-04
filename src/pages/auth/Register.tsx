import { ArrowLeft } from "lucide-react";
import { CardShared } from "@/components/shared/CardShared";
import { AuthLogo } from "@/components/shared/AuthLogo";
import { AuthBg } from "@/components/shared/AuthBg";
import RegisterForm from "@/components/form-kit/register";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import useResponsive from "@/utils/useResponsive";

const DesktopRegisterComp = () => {
  return (
    <Card className="shadow-lg rounded-lg  border border-gray-100 w-[60vh] h-[70vh] max-h-[70vh]">
      <CardContent className="px-4">
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

const MobileRegisterComp = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen relative px-4">
      <p
        className="absolute top-5 left-5 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
      </p>

      <div className="flex flex-col items-center justify-center h-full text-sm">
        <AuthLogo width={80} height={80} mobile={true} />
        <div className="w-[80%] md:max-w-[40%]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();
  return (
    <AuthBg>
      {desktopResponsive && (
        <CardShared logo={<AuthLogo />} cardContent={<DesktopRegisterComp />} />
      )}

      {(mobileResponsive || tabletResponsive) && <MobileRegisterComp />}
    </AuthBg>
  );
};

export default Register;
