import { useEffect } from "react";
import CartComp from "./components/CartComp";
import CheckoutComp from "./components/CheckoutComp";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toast } from "@/components/ui/use-toast";

import {
  setCartItems,
  setPayment,
  setTotalCost,
  updateTotalCost,
} from "@/store/slices/Checkout/checkOutSlice";
import { useCheckoutItems } from "@/utils/api hooks/useCheckout";
import { addOrder } from "@/api/endpoints/checkoutApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductsHomeComp from "../home/components/ProductsHomeComp";
import { useHomeData } from "@/utils/api hooks/useHomeData";
import MainLoading from "@/components/shared/MainLoading";

// Zod schema for form validation
export const formSchema = z.object({
  user_name: z.string().min(1, "Name is required"),
  phone_number: z
    .string()
    .regex(/^\d+$/, "Phone number should contain digits only")
    .min(10, "Phone number should be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  payment_screenshot: z
    .instanceof(File, { message: "Payment file is required" }) // Ensures file is an instance of File
    .optional(),
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartProducts, paymentData, isSuccess, total, isLoading } =
    useCheckoutItems();
  const { productsData } = useHomeData();
  const userId = useAppSelector((state) => state.user.id);
  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCartItems(cartProducts));
      dispatch(setPayment(paymentData));
      dispatch(setTotalCost(total));
      dispatch(updateTotalCost());
    }
  }, [cartProducts, paymentData, dispatch]);

  // const cartItems = useAppSelector((state) => state.checkout.cartItems);
  const totalCost = useAppSelector((state) => state.checkout.orderCost.total);
  const paymentId = useAppSelector((state) => state.checkout.paymentId);
  console.log(paymentId, "payment id");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: userData.name || "",
      phone_number: userData.phone || "",
      address: userData.address || "",
      payment_screenshot: null,
    },
  });

  const mutation = useMutation({
    mutationFn: addOrder,
  });

  if (isLoading) {
    return <MainLoading />;
  }

  // console.log(form);

  const onSubmit = (data: any) => {
    const products = cartProducts
      .filter((item) => item.quantity && item.variant.id)
      .map((item: any) => ({
        variation_id: item.variant.id,
        quantity: item.quantity,
      }));

    const latestData = {
      user_id: userId,
      total_price: totalCost,
      products: products,
      account_id: paymentId,
      ...data,
    };

    mutation.mutate(latestData, {
      onSuccess: () => {
        toast({
          title: "Success !!",
          description:
            "Your order is submitted successfully. Please wait for the admin to confirm the order.",
        });
        navigate("/"); // ✅ Navigate only after a successful API response
      },
      onError: (error: any) => {
        toast({
          title: "Order Submission Failed",
          description:
            error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div>
      {isSuccess && (
        <div className="mb-4">
          <div className="xl:p-8 py-8">
            <h1 className="mb-5">Your Basket</h1>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col md:flex-row gap-4 items-center md:items-start ">
                  <CartComp cartItems={cartProducts} />
                  <CheckoutComp
                    isOrderDetail={false}
                    isPending={mutation.isPending}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
          <div className="space-y-4">
            <ProductsHomeComp
              id={1}
              name="Your picks"
              data={productsData.beauty_offer}
            />
            <ProductsHomeComp
              id={2}
              name="Recommended for you"
              data={productsData.Choose_for_you}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
