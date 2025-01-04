import { useEffect, useState } from "react";
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
import { useAuth } from "@/utils/useAuth";

const stepOneSchema = z
  .object({
    email: z
      .string()
      .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: "Please enter a valid email!",
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
          message: "At least one special,number and uppercase!",
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

const stepTwoSchema = z.object({
  name: z.string().min(3, {
    message: "Your name must be at least 3 characters",
  }),
});

const stepThreeSchema = z.object({
  address: z.string().min(1, { message: "Address is required!" }),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useAuth();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
  });
  const schemas = [stepOneSchema, stepTwoSchema, stepThreeSchema];
  const { mutate, isError } = useMutation({
    mutationFn: postRegister,
  });

  const form = useForm<z.infer<(typeof schemas)[number]>>({
    resolver: zodResolver(schemas[currentStep - 1]),
    defaultValues: formData,
    mode: "onChange",
  });

  const handleNextStep = async (data) => {
    const isValid = await form.trigger();
    if (!isValid) return; // Prevent advancing if validation fails

    setFormData((prev) => ({ ...prev, ...data }));

    // Proceed to the next step or submit
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitForm({ ...formData, ...data });
    }
  };

  const handleSubmitForm = (data: any) => {
    mutate(data, {
      onSuccess: (response) => {
        toast({ title: "Your account is created successfully!" });
        register(response.data);
        localStorage.setItem("authToken", response.data.token);
        navigate("/");
      },
      onError: (err) => {
        toast({
          title: err.response?.data?.message || "Submission failed",
          variant: "destructive",
        });
      },
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="text-center lg:mt-4">
              <h1 className="text-black text-2xl font-bold">Create Account</h1>
              <p className="mt-6 mb-8">
                Please create your account to explore all the products
              </p>
            </div>
            <div className="space-y-6 mt-7">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password */}
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
              {/* Confirm Password */}
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
            </div>
          </div>
        );
      case 2:
        return (
          <div className="my-5">
            <div className="text-center lg:mt-4">
              <h1 className="text-black text-2xl font-bold">Create Profile</h1>
              <p className="my-6">
                Please enter your user name to set up your profile
              </p>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-8">
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 3:
        return (
          <div className="my-5">
            <div className="text-center lg:mt-4">
              <h1 className="text-black text-2xl font-bold">Your Address</h1>
              <p className="my-6">
                Please enter your address for delivering your order.
              </p>
            </div>
            <div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormControl>
                      <Input placeholder="Enter your Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Define submit handler
  // function onSubmit(data: z.infer<typeof formSchema>) {
  //   mutate(data, {
  //     onSuccess: (response) => {
  //       toast({
  //         title: "Your account is created Sucessful",
  //         variant: "default",
  //       });
  //       const data = response.data;
  //       register(data);
  //       navigate("/");
  //       localStorage.setItem("authToken", data.token);
  //     },
  //     onError: (err) => {
  //       setErrorMessage(err.response?.data?.errors.email || "Login failed");
  //       toast({
  //         title: errorMessage,
  //         variant: "destructive",
  //       }); // Extract message or set a default
  //     },
  //   });
  // }

  // if(isLoading) return <MainLoading/>

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleNextStep)}
        className="lg:flex lg:flex-col  lg:justify-center h-full"
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-1 gap-5 mt-7">{renderStep()}</div>
        </div>
        <div className="flex flex-col mt-5 gap-2">
          <Button type="submit">
            {currentStep < 3 ? "Confirm" : "Submit"}
          </Button>
          {currentStep > 1 && (
            <Button
              variant="ghost"
              type="button" // Prevent form submission
              onClick={() => {
                form.reset({ ...formData }); // Reset form to last saved state
                setCurrentStep((prevStep) => Math.max(1, prevStep - 1));
              }}
            >
              Back
            </Button>
          )}
          {currentStep == 1 && (
            <p
              className="text-center text-sm  hover:underline mt-2 font-bold text-purple-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Already have an account?
            </p>
          )}
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
