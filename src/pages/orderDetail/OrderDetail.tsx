import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toast } from "@/components/ui/use-toast";

import {
  setCartItems,
  setPayment,
  setTotalCost,
  updateDeliveryInfo,
  updateOrderCost,
  updateTotalCost,
} from "@/store/slices/Checkout/checkOutSlice";

import { useNavigate, useParams } from "react-router-dom";
import CartComp from "../checkout/components/CartComp";
import CheckoutComp from "../checkout/components/CheckoutComp";
import { useOrderDetail } from "@/utils/useOrder";
import DetailCart from "./components/DetailCart";

const Checkout = () => {
  const { orderId } = useParams();
  const userId = useAppSelector((state) => state.user.id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderDetails, isSuccess, isError, isLoading } = useOrderDetail(
    Number(orderId),
    userId
  );
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCartItems(orderDetails.order_items));
      // dispatch(setPayment(paymentData));
      // dispatch(setTotalCost(total));
    }
  }, [orderDetails, dispatch]);

  // const cartItems = useAppSelector((state) => state.checkout.cartItems);
  const totalCost = useAppSelector((state) => state.checkout.orderCost.total);
  const paymentId = useAppSelector((state) => state.checkout.paymentId);

  // console.log(form);

  return (
    <div>
      {isSuccess && (
        <div className="py-8">
          <h1 className="mb-5">Your Basket</h1>
          <div className="flex flex-col md:flex-row gap-7 items-center md:items-start md:justify-evenly">
            <DetailCart />
            {/* <CheckoutComp /> */}
          </div>

          {/* <Button type="submit" variant="welcome">
              Submit{" "}
            </Button> */}
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
