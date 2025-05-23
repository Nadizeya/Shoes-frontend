import { useNavigate } from "react-router-dom";
import Warejeans from "/assets/success.png";
import { Button } from "@/components/ui/button";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:h-screen sm:pr-4">
      <div className="w-full h-full flex sm:w-[50%] md:w-[60%]">
        <div className=" bg-pinkbg h-full w-1/2 z-0"></div>
        <div className="flex items-center justify-center -ml-36 xl:-ml-48 z-10 ">
          <div className=" flex items-center justify-center sm:bg-white w-[400px] sm:w-[270px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] xl:w-[450px] h-[270px] xl:h-[450px] sm:h-[400px] sm:shadow-lg sm:border-r-hidden sm:rounded-l-3xl">
            <img src={Warejeans} alt="" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center sm:py-5 py-10 w-full sm:w-[47%] md:w-[40%] lg:w-[30%] xl:w-[35%]  md:mr-16  sm:shadow-lg sm:rounded-b-3xl px-4 sm:p-0">
        <div className="w-full sm:w-[85%] space-y-7 sm:py-6">
          <h1 className=" font-bold text-2xl mb-4">
            Reset Password Successful
          </h1>
          <p className="text-sm md:text-base">
            Your password has been successfully changed. Please sign in again
            when you are ready.
          </p>
          <Button
            onClick={() => navigate("/login")}
            variant="welcome"
            className="w-full text-lg"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
