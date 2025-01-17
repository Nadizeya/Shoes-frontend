import { useState } from "react";
import Warejeans from "/assets/resetpassword.png";
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
import { useAppSelector } from "@/store/hook";
import { useNavigate } from "react-router-dom";
import { postResetPassword } from "@/api/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import { openCloseEyesPassword } from "@/utils/helpers/OpenCloseEyesPassword";

const FormSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const email = useAppSelector((state) => state.user.email);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postResetPassword,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = { email, password: data.password };
    mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Changing Password is successful.",
        });
        navigate("/success");
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
      <div className="w-full h-full flex sm:w-[50%] md:w-[60%]">
        <div className=" bg-pinkbg h-full w-1/2 z-0"></div>
        <div className="flex items-center justify-center -ml-32 xl:-ml-48 z-10 ">
          <div className=" flex items-center justify-center bg-white w-[300px] sm:w-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] h-[300px] xl:h-[500px] sm:h-[250px] sm:shadow-lg sm:border-r-hidden sm:rounded-l-3xl">
            <img src={Warejeans} alt="" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center sm:py-5 py-10 w-full sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[35%]  md:mr-16 space-y-4 sm:shadow-lg sm:rounded-b-3xl px-4 sm:p-0">
        <div className="w-full sm:w-[85%] space-y-4">
          <h1 className=" font-bold text-2xl">Reset Password</h1>
          <p className="">
            *Password must be 8+ characters, with at least one uppercase letter,
            one lowercase letter, one digit, and one special character.
          </p>
        </div>
        <div className="w-full sm:w-[85%]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-input"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {openCloseEyesPassword(showPassword)}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-input"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Your Password"
                          {...field}
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {openCloseEyesPassword(showConfirmPassword)}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

export default ResetPassword;
