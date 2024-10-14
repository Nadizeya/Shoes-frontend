import { useAppSelector } from "@/store/hook";
import { CartCardShared } from "../CardCardShared";
import { Separator } from "@/components/ui/separator";

const CalculateTotalContent = () => {
  const orderCost = useAppSelector((state) => state.checkout.orderCost);

  return (
    <div className="space-y-3">
      <h1 className="mb-3">Order Summary</h1>
      <div className="flex justify-between">
        <span>Total</span>
        <span>{orderCost.total} Ks</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery Cost</span>
        <span>{orderCost.deliveryCost} Ks</span>
      </div>
      <Separator />
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{orderCost.subtotal} Ks</span>
      </div>
    </div>
  );
};

const CalculateTotal = () => {
  return (
    <div>
      <CartCardShared
        cardContent={<CalculateTotalContent />}
        cardClassName="py-3"
      />
    </div>
  );
};

export default CalculateTotal;
