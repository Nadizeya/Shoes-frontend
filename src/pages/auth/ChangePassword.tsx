import Warejeans from "/assets/forgotpassword.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { postForgotPassword } from "@/api/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import { setEmail } from "@/store/slices/user/userSlice";
import { useAppDispatch } from "@/store/hook";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const FormSchema = z.object({
  email: z.string().email(),
});

const ChangePassword = () => {
  const { completeStep } = useAuthGuard();
  console.log(completeStep, "Step");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isError, isPending } = useMutation({
    mutationFn: postForgotPassword,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "OTP code has been sent to your Email successfully!!",
        });
        dispatch(setEmail(data));
        completeStep("changePasswordCompleted");
        navigate("/change-password/otp-validation");
      },
      onError: (err: unknown) => {
        if (err && typeof err === "object" && "response" in err) {
          const response = (err as any).response;
          setErrorMessage(
            response?.data?.message || "Email is invalid! Please try again"
          );
        } else {
          setErrorMessage("Email is invalid");
        }
      },
    });
  }

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:h-screen sm:pr-4">
      <div className="w-full h-full flex justify-center lg:justify-start sm:w-[50%] md:w-[60%]">
        <p
          className="lg:hidden absolute top-5 left-5 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft />
        </p>
        <div className=" bg-pinkbg h-full hidden lg:flex lg:w-1/2 z-0"></div>

        <div className="mt-5 flex items-center justify-center xl:-ml-48 z-10 ">
          <div className=" flex items-center justify-center lg:bg-white  w-[300px]  sm:w-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] h-[300px] xl:h-[500px] sm:h-[250px] sm:shadow-lg sm:border-r-hidden sm:rounded-l-3xl">
            <img src={Warejeans} alt="" className="lg:p-16" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center sm:py-10  w-full sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[35%]  md:mr-16  sm:shadow-lg sm:rounded-b-3xl px-4 sm:p-0">
        <div className="w-full sm:w-[85%] space-y-4">
          <h1 className="text-center font-bold text-2xl">Forgot Password?</h1>
          <p className="text-sm md:text-base">
            Don’t worry ! It happens. Please enter the phone number we will send
            the OTP in this phone number.
          </p>
        </div>
        <div className="mt-4 w-full sm:w-[85%]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-input font-sans"
                        type="email"
                        placeholder="Enter your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && (
                <small className="text-red-600">{errorMessage}</small>
              )}
              <Button
                type="submit"
                variant="welcome"
                disabled={isPending}
                className="w-full text-lg"
              >
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
