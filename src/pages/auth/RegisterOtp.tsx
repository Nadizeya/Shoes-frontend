import Warejeans from "/assets/otpvalidation.png";

import { InputOTPForm } from "@/components/form-kit/otp/OtpForm";
import { useAppSelector } from "@/store/hook";
import { postForgotPassword } from "@/api/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterOtp = () => {
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.user.email);
  const { mutate, isPending } = useMutation({
    mutationFn: postForgotPassword,
  });

  function handleResend(data: { email: string }) {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "OTP code has been sent to your Email successfully!!",
        });
      },
      onError: (err: any) => {
        const message = err?.response?.data?.msg || "Email is invalid";
        toast({
          title: message,
          variant: "destructive",
        });
      },
    });
  }
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:h-screen sm:pr-4">
      <div className="w-full h-full flex justify-center md:justify-start sm:w-[50%] md:w-[60%]">
        <p
          className="md:hidden absolute top-5 left-5 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft />
        </p>
        <div className=" bg-pinkbg h-full hidden md:flex  md:w-1/2 z-0"></div>

        <div className="mt-5 flex items-center justify-center md:-ml-36  lg:-ml-48 z-10 ">
          <div className=" flex items-center justify-center sm:py-4 md:bg-white w-[300px] sm:w-[300px] md:w-[330px] md:h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] h-[300px] xl:h-[500px] sm:h-[250px] sm:shadow-lg sm:border-r-hidden sm:rounded-l-3xl">
            <img src={Warejeans} alt="" className="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center sm:py-5 xl:py-10 w-full sm:w-[40%] md:w-[45%] lg:w-[32%] xl:w-[25%]  md:mr-16 space-y-8 sm:shadow-lg sm:rounded-b-3xl px-4 sm:p-0">
        <div className="w-full sm:w-[85%] space-y-4">
          <h1 className="font-bold text-2xl">OTP Verification</h1>
          <p className="text-sm">
            Please enter the OTP that was sent to your Email Address.
          </p>
        </div>
        <div className="w-full sm:w-[85%] ">
          <InputOTPForm mode="register" />
        </div>
        <span>
          If you didn’t receive the OTspan,{" "}
          <span
            onClick={
              !isPending ? () => handleResend({ email: email }) : undefined
            }
            className={`cursor-pointer ${
              isPending ? "text-slate-400" : "text-blue-500"
            }`}
            style={{ pointerEvents: isPending ? "none" : "auto" }} // Optional to further prevent clicks
          >
            Resend
          </span>
        </span>
      </div>
      {/* <div className="space-y-4 px-4 flex flex-col justify-center ">
        <h1 className=" font-bold text-2xl">OTP Verification</h1>
        <p className="">
          Please enter the OTP that was sent to your Email Address.
        </p>
      </div> */}
    </div>
  );
};

export default RegisterOtp;
