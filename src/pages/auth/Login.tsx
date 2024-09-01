import { CardShared } from "@/components/shared/CardShared";
import { AuthLogo } from "@/components/shared/AuthLogo";
import { AuthBg } from "@/components/shared/AuthBg";
import LoginForm from "@/components/form-kit/login";
import { Card, CardContent } from "@/components/ui/card";
import useResponsive from "@/utils/useResponsive";

const DesktopLoginComp = () => {
  return (
    <Card className="shadow-lg rounded-lg  border border-gray-100 h-[25rem]">
      <CardContent className=" p-4 h-full">
        <div className="text-center">
          <h1 className="text-black text-2xl font-bold">Welcome Back</h1>
          <p className="my-4">
            Please eneter your account details to sign in your account
          </p>
        </div>
        <div className="h-full">
          <LoginForm />
        </div>
      </CardContent>
    </Card>
  );
};

const MobileLoginComp = () => {
  return (
    <Card className="shadow-lg rounded-lg  border border-gray-100">
      <CardContent className=" p-4">Mobile</CardContent>
    </Card>
  );
};
const TabletLoginComp = () => {
  return (
    <Card className="shadow-lg rounded-lg  border border-gray-100">
      <CardContent className=" p-4">Tablet</CardContent>
    </Card>
  );
};

const Login = () => {
  const { desktopResponsive, mobileResponsive, tabletResponsive } =
    useResponsive();
  return (
    <AuthBg>
      {desktopResponsive && (
        <CardShared logo={<AuthLogo />} cardContent={<DesktopLoginComp />} />
      )}
      {tabletResponsive && <TabletLoginComp />}
      {mobileResponsive && <MobileLoginComp />}
    </AuthBg>
  );
};

export default Login;
