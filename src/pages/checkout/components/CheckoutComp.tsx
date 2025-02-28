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
          <div className="border-rounded">
            <img
              src={BASE_URL + orderSummary.receipt_photo}
              className="w-full h-[250px] object-cover  "
              alt=""
            />
          </div>
        </div>
      )}
      {!isOrderDetail && <PaymentMethod isPending={isPending} />}
    </div>
  );
};

export default CheckoutComp;
