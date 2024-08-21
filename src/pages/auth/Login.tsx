import { CardShared } from "@/components/shared/CardShared";
import { AuthLogo } from "@/components/shared/AuthLogo";
import { AuthBg } from "@/components/shared/AuthBg";
import LoginForm from "@/components/form-kit/login";
import { Card, CardContent } from "@/components/ui/card";

const LoginComp = () => {
  return (
    <Card className="shadow-lg rounded-lg  border border-gray-100">
      <CardContent className=" p-4">
        <div className="text-center">
          <h1 className="text-black text-2xl font-bold">Welcome Back</h1>
          <p className="my-4">
            Please eneter your account details to sign in your account
          </p>
        </div>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

const Login = () => {
  return (
    <AuthBg>
      <CardShared logo={<AuthLogo />} cardContent={<LoginComp />} />
    </AuthBg>
  );
};

export default Login;
