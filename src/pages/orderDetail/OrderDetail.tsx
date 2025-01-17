import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";

import { setCartItems } from "@/store/slices/Checkout/checkOutSlice";

import { useParams } from "react-router-dom";
import { useOrderDetail } from "@/utils/api hooks/useOrder";

const Checkout = () => {
  const { orderId } = useParams();
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();
  const { orderDetails, isSuccess } = useOrderDetail(Number(orderId), userId);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCartItems(orderDetails.order_items as any));
      // dispatch(setPayment(paymentData));
      // dispatch(setTotalCost(total));
    }
  }, [orderDetails, dispatch]);

  // const cartItems = useAppSelector((state) => state.checkout.cartItems);
  // const totalCost = useAppSelector((state) => state.checkout.orderCost.total);
  // const paymentId = useAppSelector((state) => state.checkout.paymentId);

  // console.log(form);

  return (
    <div>
      {isSuccess && (
        <div className="py-8">
          <h1 className="mb-5">Your Basket</h1>
          <div className="flex flex-col md:flex-row gap-7 items-center md:items-start md:justify-evenly">
            {/* <DetailCart /> */}
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
