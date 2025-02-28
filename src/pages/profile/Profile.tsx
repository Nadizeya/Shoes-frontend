import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store/hook";
import { useUserDetail } from "@/utils/api hooks/useUser";
import { CaretLeft, PencilSimple } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { updateUserDetail } from "@/api/endpoints/userApi";
import MainLoading from "@/components/shared/MainLoading";

const profileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Enter a valid email" }),
  phone: z.string().optional(),
  address: z.string().min(1, { message: "Address is required" }),
});

const Profile = () => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.id);
  const { isSuccess, userData, isLoading } = useUserDetail(userId);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (isSuccess && userData) {
      form.reset({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
      });
    }
  }, [isSuccess, userData, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof profileSchema>) =>
      updateUserDetail(userId, data),
    onSuccess: () => {
      toast({ title: "Profile updated successfully!" });
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast({
        title: "Update failed!",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <div>
      {isSuccess && (
        <div className="py-6 space-y-4">
          <span
            className="flex items-center gap-2 cursor-pointer text-sm"
            onClick={() => navigate("/")}
          >
            <CaretLeft size={15} />
            Back to Home
          </span>

          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Account Information</h1>
            <Button
              type="button"
              className="flex items-center gap-1"
              onClick={() => setIsEditing(true)}
              disabled={isEditing} // Disable when editing is active
            >
              <PencilSimple size={18} />
              Edit
            </Button>
          </div>

          <Separator className="bg-black" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(mutate)} className="space-y-4">
              {[
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Mobile Number", key: "phone" },
                { label: "Address", key: "address" },
              ].map((item, index) => (
                <div key={index}>
                  <FormField
                    control={form.control}
                    name={item.key as keyof z.infer<typeof profileSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-4">
                          <h2 className="font-semibold w-1/5">{item.label}</h2>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={item.label}
                              readOnly={!isEditing}
                              className={`flex-grow p-2 border focus-visible:ring-0 focus-visible:ring-offset-0 ${
                                isEditing
                                  ? "border-gray-400 "
                                  : "border-none bg-transparent"
                              }`}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="bg-gray-300 mt-5" />
                </div>
              ))}

              {/* Buttons - Always shown but only clickable when editing */}
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    form.reset({
                      name: userData.name,
                      email: userData.email,
                      phone: userData.phone,
                      address: userData.address,
                    });
                    setIsEditing(false);
                  }}
                  disabled={!isEditing || isPending} // Disable if not editing or saving
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!isEditing || isPending}>
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Profile;
