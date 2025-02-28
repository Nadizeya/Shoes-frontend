"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAppSelector } from "@/store/hook";
import { postOtpValidation, postRegisterOtp } from "@/api/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuth } from "@/utils/useAuth";

const FormSchema = z.object({
  otp_code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type InputOTPFormProps = {
  mode: "register" | "forgotPassword";
};

export function InputOTPForm({ mode }: InputOTPFormProps) {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { completeStep } = useAuthGuard();
  const email = useAppSelector((state) => state.user.email);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp_code: "",
    },
  });

  const mutationFn = mode === "register" ? postRegisterOtp : postOtpValidation;

  const { mutate, isError } = useMutation({
    mutationFn: mutationFn,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const otpAsNumber = Number(data.otp_code);

    if (isNaN(otpAsNumber)) {
      setErrorMessage("Invalid OTP value");
      return;
    }

    const payload = { otp_code: otpAsNumber, email };
    console.log("Payload:", payload);

    mutate(payload, {
      onSuccess: (response) => {
        toast({
          title: "Your OTP is correct.",
          // description: (
          //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          //     <code className="text-white">
          //       {JSON.stringify(payload, null, 2)}
          //     </code>
          //   </pre>
          // ),
        });
        if (mode === "register") {
          register(response.data);
        }
        completeStep("otpValidated");

        navigate(mode === "register" ? "/" : "/reset-password");
      },
      onError: (err) => {
        console.error(err);
        setErrorMessage("Wrong OTP code");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="otp_code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPGroup key={index}>
                      <InputOTPSlot index={index} />
                    </InputOTPGroup>
                  ))}
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && <small className="text-red-600 mt-4">{errorMessage}</small>}
        <Button
          type="submit"
          variant="welcome"
          className="w-full text-lg place-self-center"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}
