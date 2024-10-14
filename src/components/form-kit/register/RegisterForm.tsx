import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { openCloseEyesPassword } from "@/utils/helpers/OpenCloseEyesPassword";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { postRegister } from "@/api/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import login from "../login";

const formSchema = z
  .object({
    email: z
      .string()
      .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: "Please enter a valid email!",
      }),
    name: z.string().min(3, {
      message: "Your name must be at least 3 characters",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .refine(
        (value) =>
          /[a-z]/.test(value) && // at least one lowercase letter
          /[0-9]/.test(value) && // at least one digit
          /[!@#$%^&*(),.?":{}|<>]/.test(value), // at least one special character
        {
          message:
            "Password must contain at least one digit, one lowercase letter, and one special character.",
        }
      ),
    confirmPassword: z.string().min(1, {
      message: "Password confirmation is required!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match!",
  });

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isError } = useMutation({
    mutationFn: postRegister,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  // Define submit handler
  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data, {
      onSuccess: (response) => {
        toast({
          title: "Your account is created Sucessful",
          variant: "default",
        });
        const data = response.data;
        // login(data);
        navigate("/");
        localStorage.setItem("authToken", data.token);
      },
      onError: (err) => {
        setErrorMessage(err.response?.data?.message || "Login failed"); // Extract message or set a default
      },
    });
  }

  // if(isLoading) return <MainLoading/>

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:flex lg:flex-col lg:justify-between h-[75%]"
      >
        <div className="grid grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Name"
                    className="bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*name number*/}

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-gray-100"
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
          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-gray-100"
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
        </div>
        <div className="flex flex-col mt-5 gap-2">
          <Button type="submit">Sign Up</Button>
          <p
            className="text-center font-bold text-purple-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
