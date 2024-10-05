import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { openCloseEyesPassword } from "@/utils/helpers/OpenCloseEyesPassword";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { useApiSend } from "@/utils/useQueryHook";
import { postLogin } from "@/api/endpoints/authApi";

// Define schema with both email and password validation
const FormSchema = z.object({
  contact: z
    .string()
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        /^\+?\d{10,15}$/.test(value),
      {
        message: "Please enter a valid phone number or email!",
      }
    ),
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
});

type LoginPropsT = {
  mobile?: boolean;
};

// Define success and error handlers
const onSuccess = (data) => {
  console.log(data);
};

const onError = (error) => {
  console.error("Login failed:", error);
};

function LoginForm({ mobile }: LoginPropsT) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contact: "",
      password: "",
    },
  });

  const { mutate } = useApiSend(postLogin, onSuccess, onError, [], {});

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  const mobileClassName = "flex flex-col justify-between gap-5";
  const desktopClassName = "h-[75%] flex flex-col justify-between";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={mobile ? mobileClassName : desktopClassName}
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-gray-100"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormDescription
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/reset-password")}
          >
            Forgot your Password?
          </FormDescription>
        </div>
        <div className="text-center">
          <Button type="submit" variant="welcome" className="w-full">
            Sign In
          </Button>
          <p
            className="text-center cursor-pointer mt-2"
            onClick={() => navigate("/register")}
          >
            Create new account
          </p>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
