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
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/endpoints/authApi";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/utils/useAuth";

// Define schema with both username and password validation
const FormSchema = z.object({
  username: z
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
    .min(6)
    .refine(
      (value) =>
        /[a-z]/.test(value) && // at least one lowercase letter
        /[0-9]/.test(value) && // at least one digit
        /[!@#$%^&*(),.?":{}|<>]/.test(value) // at least one special character
    ),
});

type LoginPropsT = {
  mobile?: boolean;
};

function LoginForm({ mobile }: LoginPropsT) {
  const { toast } = useToast();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "silvernadi99@gmail.com",
      password: "Nadizeya@123",
    },
  });
  const { mutate, isError, isPending } = useMutation({
    mutationFn: postLogin,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data, {
      onSuccess: (response) => {
        toast({
          title: "Login Sucessful",
          variant: "default",
        });
        const data = response.data;
        login(data);
        navigate("/");
        localStorage.setItem("authToken", data.token);
      },
      onError: (err: unknown) => {
        if (err && typeof err === "object" && "response" in err) {
          const response = (err as any).response;
          setErrorMessage(response?.data?.message || "Login failed");
        } else {
          setErrorMessage("Login failed");
        }
      },
    });

    console.log(data);
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-gray-100"
                    placeholder="Email or PhoneNumber"
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
          {isError && <small className="text-red-600">{errorMessage}</small>}
          <FormDescription
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/change-password")}
          >
            Forgot your Password?
          </FormDescription>
        </div>
        <div className="text-center">
          <Button
            type="submit"
            variant="welcome"
            className="w-full"
            disabled={isPending}
          >
            Sign In
          </Button>
          <p
            className="text-center cursor-pointer mt-2 text-sm"
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
