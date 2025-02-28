import CalculateTotal from "./CalculateTotal";
import Delivery from "./Delivery";
import PaymentMethod from "./PaymentMethod";

const CheckoutComp = ({ isOrderDetail }: { isOrderDetail: boolean }) => {
  return (
    <div className="space-y-5 w-full sm:w-[80%] md:w-[40%] lg:w-[30%]">
      <Delivery isReadOnly={isOrderDetail} />
      <CalculateTotal isReadOnly={isOrderDetail} />
      {!isOrderDetail && <PaymentMethod />}
    </div>
  );
};

export default CheckoutComp;
