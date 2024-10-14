import CalculateTotal from "./CalculateTotal";
import Delivery from "./Delivery";
import PaymentMethod from "./PaymentMethod";

const CheckoutComp = () => {
  return (
    <div className="space-y-5 ">
      <Delivery />
      <CalculateTotal />
      <PaymentMethod />
    </div>
  );
};

export default CheckoutComp;
