import React from "react";
import Warejeans from "/assets/otpvalidation.png";

import { InputOTPForm } from "@/components/form-kit/otp/OtpForm";
import { Link } from "react-router-dom";

const OtpValidation = () => {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:h-screen sm:pr-4">
      <div className="w-full h-full flex sm:w-[50%] md:w-[60%]">
        <div className=" bg-pinkbg h-full w-1/2 z-0"></div>

        <div className="flex items-center justify-center -ml-32 xl:-ml-48 z-10 ">
          <div className=" flex items-center justify-center bg-white w-[300px] sm:w-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] h-[300px] xl:h-[500px] sm:h-[250px] sm:shadow-lg sm:border-r-hidden sm:rounded-l-3xl">
            <img src={Warejeans} alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center sm:py-5 xl:py-10 w-full sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%]  md:mr-16 space-y-8 sm:shadow-lg sm:rounded-b-3xl px-4 sm:p-0">
        <div className="w-full sm:w-[85%] space-y-4">
          <h1 className="font-bold text-2xl">OTP Verification</h1>
          <p className="font-semibold">
            Please enter the OTP that was sent to your Email Address.
          </p>
        </div>
        <div className="w-full sm:w-[85%]">
          <InputOTPForm />
        </div>
        <p className="">
          If you didn’t receive the OTP,{" "}
          <Link to={"/change-password"} className="text-blue-600">
            Resend
          </Link>{" "}
        </p>
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

export default OtpValidation;
