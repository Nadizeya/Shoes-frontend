import { useParams } from "react-router-dom";
import { useOrderDetail } from "@/utils/api hooks/useOrder";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useEffect } from "react";
import { setOrderPayment } from "@/store/slices/OrderDetail/orderDetailslice";
import OrderDetailCart from "./OrderDetailCart";
import CheckoutComp from "../checkout/components/CheckoutComp";
import { useForm, FormProvider } from "react-hook-form";

const Checkout = () => {
  const { orderId } = useParams();
  const userId = useAppSelector((state) => state.user.id);
  const { orderDetails, isSuccess } = useOrderDetail(Number(orderId), userId);
  const dispatch = useAppDispatch();

  // Initialize form with default values
  const formMethods = useForm({
    defaultValues: {
      user_name: orderDetails?.delivery.name || "",
      address: orderDetails?.delivery.address || "",
      phone_number: orderDetails?.delivery.phone_number || "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setOrderPayment(orderDetails));

      formMethods.reset({
        user_name: orderDetails?.delivery.name,
        address: orderDetails?.delivery.address,
        phone_number: orderDetails?.delivery.phone_number,
      });
    }
  }, [orderDetails, isSuccess, dispatch, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <div>
        {isSuccess && (
          <div className="xl:p-8 py-8">
            <h1 className="mb-5">Your Basket</h1>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center md:items-start">
              <OrderDetailCart cartItems={orderDetails.order_items} />
              <CheckoutComp isOrderDetail={true} />
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default Checkout;
