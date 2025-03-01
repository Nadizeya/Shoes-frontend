import { useAppSelector } from "@/store/hook";
import CalculateTotal from "./CalculateTotal";
import Delivery from "./Delivery";
import PaymentMethod from "./PaymentMethod";
import { BASE_URL } from "@/api/BaseService";

const CheckoutComp = ({
  isOrderDetail,
  isPending,
}: {
  isOrderDetail: boolean;
  isPending: boolean;
}) => {
  const orderSummary = useAppSelector(
    (state) => state.orderdetail.order_summary
  );
  console.log(orderSummary);
  return (
    <div className="space-y-5 w-full sm:w-[80%] md:w-[40%] lg:w-[30%]">
      <Delivery isReadOnly={isOrderDetail} />
      <CalculateTotal isReadOnly={isOrderDetail} />
      {isOrderDetail && (
        <div className="space-y-5">
          <h1>Payment Screenshot</h1>
          <div className="border rounded-md overflow-hidden w-full min-w-xs flex items-center justify-center h-[250px]">
            {orderSummary.receipt_photo ? (
              <img
                src={BASE_URL + orderSummary.receipt_photo}
                className="max-w-full max-h-full object-contain"
                alt="Payment Screenshot"
              />
            ) : (
              <p className="text-gray-500 text-center">No image available</p>
            )}
          </div>
        </div>
      )}

      {!isOrderDetail && <PaymentMethod isPending={isPending} />}
    </div>
  );
};

export default CheckoutComp;
