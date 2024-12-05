import React, { useEffect } from "react";
import CartComp from "./components/CartComp";
import CheckoutComp from "./components/CheckoutComp";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toast } from "@/components/ui/use-toast";

import {
  setCartItems,
  updateDeliveryInfo,
  updateOrderCost,
} from "@/store/slices/Checkout/checkOutSlice";
import { CheckOutT } from "@/types/checkOutTypes";
import ProductsHomeComp from "../home/components/ProductsHomeComp";
import { useCheckoutItems } from "@/utils/useCheckout";

// export const itemData = [
//   {
//     id: 1,
//     title: "Gro Hair Serum",
//     image: "/assets/products/product1.png",
//     color: "Color: Adulterous - 828",
//     desc: "sdfsdfRepair 10-In-1 Hair Oil for Dry Hair",
//     price: 10000,
//     size: "30mL",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     title: "Gro Hair Serum",
//     image: "/assets/products/product3.png",
//     color: "Color: Adulterous - 828",
//     desc: "Absolut Repair 10-In-1 Hair Oil for Dry Hair",
//     price: 10000,
//     size: "30mL",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     title: "Gro Hair Serum",
//     image: "/assets/products/product2.png",
//     color: "Color: Adulterous - 828",
//     desc: "lsdfd Repair 10-In-1 Hair Oil for Dry Hair",
//     price: 10000,
//     size: "45mL",
//     quantity: 1,
//   },
// ];

// Zod schema for form validation
const formSchema = z.object({
  delivery_info: z.object({
    name: z.string().min(1, "Name is required"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "Phone number should contain digits only")
      .min(10, "Phone number should be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
  }),
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
  const dispatch = useAppDispatch();
  const { cartProducts, isSuccess, isError, isLoading } = useCheckoutItems();
  useEffect(() => {
    dispatch(setCartItems(cartProducts));
  }, [cartProducts, dispatch]);

  // const cartItems = useAppSelector((state) => state.checkout.cartItems);
  const orderCost = useAppSelector((state) => state.checkout.orderCost);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      delivery_info: {
        name: "",
        phoneNumber: "",
        address: "",
      },
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

  // console.log(form);

  const onSubmit = (data: any) => {
    toast({
      title: "Success !!",
      description:
        "Your order is submitted successful. Please wait for the admin to confirm the order.",
    });
    data = { orderCost: orderCost, cartItems: cartProducts, ...data };
    console.log(data);
  };
  return (
    <div>
      {isSuccess && (
        <div className="py-8">
          <h1 className="mb-5">Your Basket</h1>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row gap-7 items-center md:items-start md:justify-evenly">
                <CartComp />
                <CheckoutComp />
              </div>

              {/* <Button type="submit" variant="welcome">
              Submit{" "}
            </Button> */}
            </form>
          </FormProvider>
          {/* <div className="mt-5">
          <ProductsHomeComp id={1} name="Beauty Offers (25)" />
          <ProductsHomeComp id={1} name="Beauty Offers (25)" />
          <ProductsHomeComp id={1} name="Beauty Offers (25)" />
        </div> */}
        </div>
      )}
    </div>
  );
};

export default Checkout;
