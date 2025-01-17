import CalculateTotal from "./CalculateTotal";
import Delivery from "./Delivery";
import PaymentMethod from "./PaymentMethod";

const CheckoutComp = () => {
  return (
    <div className="space-y-5 w-full sm:w-[80%] md:w-[40%] lg:w-[30%] ">
      <Delivery />
      <CalculateTotal />
      <PaymentMethod />
    </div>
  );
};

export default CheckoutComp;
