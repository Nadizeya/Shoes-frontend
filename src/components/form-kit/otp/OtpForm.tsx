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
import { postOtpValidation } from "@/api/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FormSchema = z.object({
  otp_code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm() {
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.user.email);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp_code: "",
    },
  });

  const { mutate, isError } = useMutation({
    mutationFn: postOtpValidation,
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
        console.log(response.data);
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(payload, null, 2)}
              </code>
            </pre>
          ),
        });
        navigate("/reset-password");
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
