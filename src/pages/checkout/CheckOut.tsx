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
} from "@/store/slices/Checkout/checkOutSlice";
import { useCheckoutItems } from "@/utils/api hooks/useCheckout";
import { addOrder } from "@/api/endpoints/checkoutApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductsHomeComp from "../home/components/ProductsHomeComp";
import { useHomeData } from "@/utils/api hooks/useHomeData";

// Zod schema for form validation
const formSchema = z.object({
  user_name: z.string().min(1, "Name is required"),
  phone_number: z
    .string()
    .regex(/^\d+$/, "Phone number should contain digits only")
    .min(10, "Phone number should be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  // order_cost: z.object({
  //   total: z.number().min(0, "Total must be a positive number"),
  //   delivery_cost: z.number().min(0, "Delivery cost must be a positive number"),
  //   subtotal: z.number().min(0, "Subtotal must be a positive number"),
  // }),
  // payment_id: z.number().min(1, "Payment ID is required"),
  // payment_file: z
  //   .any()
  //   .refine((file) => file instanceof File, "Payment file is required"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartProducts, paymentData, isSuccess, total } = useCheckoutItems();
  const { productsData } = useHomeData();

  // console.log(paymentData, "Payment data");
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCartItems(cartProducts));
      dispatch(setPayment(paymentData));
      dispatch(setTotalCost(total));
    }
  }, [cartProducts, paymentData, dispatch]);

  // const cartItems = useAppSelector((state) => state.checkout.cartItems);
  const totalCost = useAppSelector((state) => state.checkout.orderCost.total);
  const paymentId = useAppSelector((state) => state.checkout.paymentId);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
      // order_cost: {
      //   total: 0,
      //   delivery_cost: 0,
      //   subtotal: 0,
      // },
      // payment_id: "",
      // payment_file: null,
    },
  });

  const { formState } = form;
  console.log("Errors:", formState.errors);

  const mutation = useMutation({
    mutationFn: addOrder,
  });

  // console.log(form);

  const onSubmit = (data: any) => {
    toast({
      title: "Success !!",
      description:
        "Your order is submitted successful. Please wait for the admin to confirm the order.",
    });
    console.log(data, "checkout data");

    const products = cartProducts
      .filter((item) => item.quantity && item.id)
      .map((item: any) => ({
        variation_id: item.product.item.id,
        quantity: item.quantity,
      }));
    data = {
      user_id: cartProducts[0].user_id,
      total_price: totalCost,
      products: products,
      account_id: paymentId,
      ...data,
    };
    mutation.mutate(data);
    navigate("/");
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
                  <CartComp />
                  <CheckoutComp />
                </div>
              </form>
            </FormProvider>
          </div>
          <div className="space-y-4">
            <ProductsHomeComp
              id={1}
              name="Your beauty picks"
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
