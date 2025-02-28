import { useAppSelector } from "@/store/hook";
import { CartCardShared } from "../CartCardShared";
import { Separator } from "@/components/ui/separator";

const CalculateTotalContent = ({ isReadOnly }: { isReadOnly: boolean }) => {
  const orderCost = useAppSelector((state) =>
    isReadOnly ? state.orderdetail.order_summary : state.checkout.orderCost
  );

  return (
    <div className="space-y-3">
      <h1 className="mb-3">Order Summary</h1>
      <div className="flex justify-between">
        <span>Total</span>
        <span>{orderCost?.total ?? 0} Ks</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery Cost</span>
        <span>{orderCost?.delivery ?? 0} Ks</span>
      </div>
      <Separator />
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{(orderCost?.total ?? 0) + (orderCost?.delivery ?? 0)} Ks</span>
      </div>
    </div>
  );
};

const CalculateTotal = ({ isReadOnly }: { isReadOnly: boolean }) => {
  return (
    <div>
      <CartCardShared
        cardContent={<CalculateTotalContent isReadOnly={isReadOnly} />}
        cardClassName="py-3"
      />
    </div>
  );
};

export default CalculateTotal;
