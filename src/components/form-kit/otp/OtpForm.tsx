"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
  otp: z.string().min(6, {
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
      otp: "",
    },
  });
  type FormDataWithEmail = { email: string; otp_code: number };
  const { mutate, isError } = useMutation({
    mutationFn: postOtpValidation,
  });

  function onSubmit(data: FormDataWithEmail) {
    const otpAsNumber = Number(data.otp);

    if (isNaN(otpAsNumber)) {
      setErrorMessage("Invalid OTP value");
      return;
    }
    data = { otp_code: otpAsNumber, email: email };
    mutate(data, {
      onSuccess: (response) => {
        console.log(response.data);
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        navigate("/reset-password");
      },
      onError: (err) => {
        setErrorMessage(err.response?.data?.msg || "Wrong OTP code"); // Extract message or set a default
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <small className="text-red-600 mt-4">{errorMessage}</small>
        )}

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
